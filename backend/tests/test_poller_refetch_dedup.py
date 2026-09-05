"""Tests for CommunicationIngestionPipeline poll re-fetch protection.

Regression (Aug 2026): fetch cursors lived in an in-memory dict, so every
backend restart re-fetched the newest mailbox page and re-added it — 749
distinct Outlook messages had become 21k+ duplicate rows in
atom_communications (and 20GB of Lance version manifests). These tests pin
the two halves of the fix: persisted cursors + id-dedup of fetched messages.
"""

import json
from datetime import datetime, timedelta
from pathlib import Path
from types import SimpleNamespace

import pytest

from integrations.atom_communication_ingestion_pipeline import (
    CommunicationIngestionPipeline,
)


@pytest.fixture
def pipeline(tmp_path: Path) -> CommunicationIngestionPipeline:
    memory_manager = SimpleNamespace(
        db_path=str(tmp_path / "atom_memory"),
        db=None,
        connections_table=None,
        initialize=lambda: None,
    )
    (tmp_path / "atom_memory").mkdir()
    return CommunicationIngestionPipeline(memory_manager=memory_manager)


def _patch_fetch(pipeline, monkeypatch, captured):
    async def fake_fetch(last_fetch):
        captured["last_fetch"] = last_fetch
        return [dict(m) for m in captured["messages"]]

    monkeypatch.setattr(
        pipeline,
        "_fetch_outlook_messages",
        fake_fetch,
    )


class TestCursorPersistence:
    def test_cursors_survive_restart(self, pipeline, monkeypatch):
        pipeline.fetch_timestamps["last_fetch_outlook"] = datetime(2026, 8, 28, 12, 0, 0)
        pipeline._save_fetch_state()

        # A fresh pipeline (simulated restart) restores the cursor
        restarted = CommunicationIngestionPipeline(
            memory_manager=pipeline.memory_manager
        )
        assert restarted.fetch_timestamps["last_fetch_outlook"] == datetime(
            2026, 8, 28, 12, 0, 0
        )

    def test_corrupt_state_file_does_not_crash(self, pipeline):
        pipeline._fetch_state_path.write_text("{not json")
        restarted = CommunicationIngestionPipeline(
            memory_manager=pipeline.memory_manager
        )
        assert restarted.fetch_timestamps == {}


class TestRefetchDedup:
    @pytest.mark.asyncio
    async def test_same_ids_are_not_ingested_twice(self, pipeline, monkeypatch):
        message = {
            "id": "graph-msg-1",
            "app_type": "outlook",
            "subject": "New Quote Request From New Lead",
            "sender": "Zoho Forms",
            "sender_email": "notifications@zohoforms.ca",
            "content": "Name: Mark, Kellam",
        }
        captured = {"messages": [message], "last_fetch": "unset"}
        _patch_fetch(pipeline, monkeypatch, captured)

        ingested = []

        async def fake_ingest(app_type, msg):
            ingested.append(msg["id"])
            return True

        monkeypatch.setattr(pipeline, "ingest_message", fake_ingest)

        first = await pipeline._fetch_new_messages("outlook")
        assert [m["id"] for m in first] == ["graph-msg-1"]
        # The id is marked seen only after a successful ingest.
        await pipeline._ingest_and_mark("outlook", first)

        # Second poll returns the same message (cold cursor / overlap):
        # the dedup guard must drop it instead of re-ingesting.
        second = await pipeline._fetch_new_messages("outlook")
        assert second == []

    @pytest.mark.asyncio
    async def test_failed_ingest_is_not_marked_seen(self, pipeline, monkeypatch):
        """A message whose ingest fails must stay eligible for re-ingestion
        (mark-after-success contract), not be silently lost."""
        message = {"id": "graph-msg-2", "app_type": "outlook", "subject": "x"}
        captured = {"messages": [message], "last_fetch": "unset"}
        _patch_fetch(pipeline, monkeypatch, captured)

        async def failing_ingest(app_type, msg):
            return False

        monkeypatch.setattr(pipeline, "ingest_message", failing_ingest)

        first = await pipeline._fetch_new_messages("outlook")
        await pipeline._ingest_and_mark("outlook", first)
        second = await pipeline._fetch_new_messages("outlook")
        assert [m["id"] for m in second] == ["graph-msg-2"], (
            "failed ingest must be retried on the next poll"
        )

    @pytest.mark.asyncio
    async def test_seen_ids_seed_from_store(self, pipeline, monkeypatch):
        # Simulate an already-populated comms table
        pipeline.memory_manager.db = object()
        pipeline.memory_manager.connections_table = SimpleNamespace(
            to_arrow=lambda: SimpleNamespace(
                select=lambda cols: SimpleNamespace(
                    to_pylist=lambda: [
                        {"id": "already-stored-1", "app_type": "outlook"}
                    ]
                )
            )
        )

        captured = {"messages": [{"id": "already-stored-1", "subject": "dup"}]}
        _patch_fetch(pipeline, monkeypatch, captured)
        result = await pipeline._fetch_new_messages("outlook")
        assert result == []

    def test_seen_ids_bounded_in_state_file(self, pipeline):
        pipeline._seen_message_ids = {
            "outlook": {f"id-{i}" for i in range(25000)},
            "slack": {"s-1"},
        }
        pipeline.fetch_timestamps["last_fetch_outlook"] = datetime.now()
        pipeline._save_fetch_state()
        data = json.loads(pipeline._fetch_state_path.read_text())
        assert len(data["seen_message_ids_by_app"]["outlook"]) <= 20000
        assert data["seen_message_ids_by_app"]["slack"] == ["s-1"]


class TestStoreReconciliationSelfHeal:
    """The seen-id set is a cache of the durable store, never an authority.

    Sep 2026 incident: the state file's seen ids outlived their rows (table
    rebuild + root-vs-backend store fork) — ~5.9k fetched emails were
    permanently blocked from re-ingestion and the mailbox looked 'capped at
    50'. The reconciliation must drop ghosts and re-walk only the affected
    app's window."""

    def _with_store(self, pipeline, rows):
        pipeline.memory_manager.db = object()
        pipeline.memory_manager.connections_table = SimpleNamespace(
            to_arrow=lambda: SimpleNamespace(
                select=lambda cols: SimpleNamespace(to_pylist=lambda: rows)
            )
        )

    def test_ghosts_dropped_and_store_ids_seeded(self, pipeline):
        self._with_store(
            pipeline,
            [
                {"id": "stored-1", "app_type": "outlook"},
                {"id": "stored-2", "app_type": "slack"},
            ],
        )
        pipeline._seen_message_ids = {
            "outlook": {"stored-1", "ghost-1", "ghost-2"},
            "slack": {"stored-2", "ghost-3"},
        }
        report = pipeline._reconcile_seen_ids_with_store()

        assert report == {"outlook": 2, "slack": 1}
        assert pipeline._seen_message_ids["outlook"] == {"stored-1"}
        assert pipeline._seen_message_ids["slack"] == {"stored-2"}

    def test_mass_loss_clears_only_affected_app_cursors(self, pipeline):
        self._with_store(pipeline, [{"id": "s-1", "app_type": "slack"}])
        pipeline._seen_message_ids = {
            "outlook": {f"ghost-{i}" for i in range(100)},
            "slack": {"s-1"},
        }
        pipeline.fetch_timestamps.update(
            {
                "last_fetch_outlook": datetime(2026, 6, 16),
                "last_fetch_outlook_owner-1": datetime(2026, 6, 16),
                "last_fetch_outlook_resume_owner-1": datetime(2026, 7, 22),
                "last_fetch_slack": datetime(2026, 8, 1),
            }
        )
        pipeline._reconcile_seen_ids_with_store()

        assert "last_fetch_outlook" not in pipeline.fetch_timestamps
        assert "last_fetch_outlook_owner-1" not in pipeline.fetch_timestamps
        assert "last_fetch_outlook_resume_owner-1" not in pipeline.fetch_timestamps
        assert pipeline.fetch_timestamps["last_fetch_slack"] == datetime(2026, 8, 1), (
            "unaffected app's cursors must be untouched"
        )

    def test_small_ghost_count_keeps_cursors(self, pipeline):
        self._with_store(pipeline, [{"id": "s-1", "app_type": "slack"}])
        pipeline._seen_message_ids = {"slack": {"s-1", "ghost-1", "ghost-2"}}
        pipeline.fetch_timestamps["last_fetch_slack"] = datetime(2026, 8, 1)
        pipeline._reconcile_seen_ids_with_store()
        assert pipeline.fetch_timestamps["last_fetch_slack"] == datetime(2026, 8, 1)

    def test_state_file_roundtrip_per_app(self, pipeline):
        self._with_store(pipeline, [{"id": "s-1", "app_type": "slack"}])
        pipeline._seen_message_ids = {"slack": {"s-1"}}
        pipeline.fetch_timestamps["last_fetch_slack"] = datetime(2026, 8, 1)
        pipeline._save_fetch_state()
        restarted = CommunicationIngestionPipeline(
            memory_manager=pipeline.memory_manager
        )
        assert restarted._seen_message_ids == {"slack": {"s-1"}}
        assert restarted.fetch_timestamps["last_fetch_slack"] == datetime(2026, 8, 1)

    def test_legacy_flat_state_file_is_ignored_not_crashed(self, pipeline):
        pipeline._fetch_state_path.write_text(
            json.dumps({"seen_message_ids": ["legacy-1", "legacy-2"]})
        )
        restarted = CommunicationIngestionPipeline(
            memory_manager=pipeline.memory_manager
        )
        assert restarted._seen_message_ids == {}
