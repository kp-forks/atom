"""Generalization tests: styling preservation for EVERY communication app.

The email fix (links + raw HTML + styled signatures) must hold across all
apps ingested by CommunicationIngestionPipeline._normalize_message_impl.
Per-app formats covered here:

- Slack: mrkdwn links <https://url|label> → markdown links; block payloads
  kept as raw_markup.
- Teams: html_content rich variant — stored text derived link-faithfully,
  raw HTML kept in metadata.
- Telegram / Google Chat: HTML bodies via content_type — links preserved,
  raw kept.
- WhatsApp / Discord: plain text with bare URLs — passthrough unchanged,
  nothing extra stored (nothing lost to preserve).
- Email: html_body contract unchanged (Sept 6 fix).
"""

import os

os.environ.setdefault("TESTING", "1")

import importlib

import pytest

from core.communication_styling import (
    MAX_RAW_CHARS,
    extract_raw_markup,
    preserve_links,
    slack_links_to_markdown,
)
from integrations.atom_communication_ingestion_pipeline import (
    CommunicationIngestionPipeline,
)


@pytest.fixture
def pipeline():
    return CommunicationIngestionPipeline.__new__(CommunicationIngestionPipeline)


def _normalize(pipeline, app_type, data):
    return pipeline._normalize_message_impl(app_type, data)


def _meta(record):
    meta = record["metadata"]
    if isinstance(meta, str):
        import json
        meta = json.loads(meta)
    return meta


class TestSlack:
    def test_mrkdwn_link_becomes_markdown(self, pipeline):
        rec = _normalize(pipeline, "slack", {
            "id": "s1", "text": "see <https://x.co/quote|the quote> now",
        })
        assert "[the quote](https://x.co/quote)" in rec["content"]
        assert "<https://x.co/quote|" not in rec["content"]

    def test_bare_url_link_unwrapped(self, pipeline):
        rec = _normalize(pipeline, "slack", {"id": "s2", "text": "go <https://x.co> now"})
        assert "https://x.co" in rec["content"]
        assert "<https://x.co>" not in rec["content"]

    def test_blocks_kept_as_raw_markup(self, pipeline):
        rec = _normalize(pipeline, "slack", {
            "id": "s3", "text": "plain",
            "blocks": [{"type": "rich_text", "elements": [{"type": "link", "url": "https://x.co"}]}],
        })
        meta = _meta(rec)
        assert "raw_markup" in meta and "rich_text" in meta["raw_markup"]


class TestTeams:
    def test_html_content_drives_link_faithful_text(self, pipeline):
        rec = _normalize(pipeline, "teams", {
            "id": "t1",
            "content": "see the drawing pack for details",
            "html_content": '<div>see the <a href="https://x.co/d1">drawing pack</a> for details</div>',
        })
        assert "[drawing pack](https://x.co/d1)" in rec["content"]
        meta = _meta(rec)
        assert "html_body" in meta and "href" in meta["html_body"]


class TestTelegramGoogleChat:
    @pytest.mark.parametrize("app", ["telegram", "google_chat"])
    def test_html_body_links_preserved_and_raw_kept(self, pipeline, app):
        rec = _normalize(pipeline, app, {
            "id": f"{app}-1", "content_type": "html",
            "content": '<p>invoice at <a href="https://pay.x.co/9">payment link</a></p>',
        })
        assert "[payment link](https://pay.x.co/9)" in rec["content"]
        assert "html_body" in _meta(rec)


class TestPlainTextApps:
    def test_whatsapp_plain_url_untouched(self, pipeline):
        rec = _normalize(pipeline, "whatsapp", {
            "id": "w1", "text": "check https://x.co/d1 today",
        })
        assert rec["content"] == "check https://x.co/d1 today"
        assert "html_body" not in _meta(rec) and "raw_markup" not in _meta(rec)

    def test_discord_markdown_passthrough(self, pipeline):
        rec = _normalize(pipeline, "discord", {"id": "d1", "text": "**bold** https://x.co"})
        assert "**bold**" in rec["content"]
        assert "raw_markup" not in _meta(rec)


class TestEmailContractUnchanged:
    def test_email_still_stores_html_body(self, pipeline):
        rec = _normalize(pipeline, "outlook", {
            "id": "e1", "content_type": "html",
            "from": "a@b.c", "to": "d@e.f", "subject": "s",
            "body": '<div style="font-family:Calibri">regards</div>',
            "date": "2026-09-07T00:00:00Z",
        })
        assert "html_body" in _meta(rec)
        assert "font-family" in _meta(rec)["html_body"]


class TestSharedHelpers:
    def test_slack_links_direct(self):
        assert slack_links_to_markdown("<https://a|A>") == "[A](https://a)"

    def test_preserve_links_plain_passthrough(self):
        assert preserve_links("hello") == "hello"

    def test_raw_cap(self):
        key, raw = extract_raw_markup(
            '<a href="https://x">' + "y" * (MAX_RAW_CHARS + 100) + "</a>", {})
        assert key == "html_body" and len(raw) <= MAX_RAW_CHARS

    def test_never_raises_on_weird_metadata(self, pipeline):
        rec = _normalize(pipeline, "teams", {
            "id": "t2", "content": "text",
            "html_content": '<a href="https://x">l</a>',
            "metadata": "not-json{{{",
        })
        assert rec["content"]
