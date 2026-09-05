#!/usr/bin/env bash
# External-storage status for the ATOM split layout (2026-09-05).
#
# The repo lives on the internal SSD; heavy data lives on the Seagate
# portable drive:
#   - backend/data/atom_memory  (LanceDB memory store)  -> drive via symlink
#   - Docker Desktop DataFolder                                 -> drive
#   - Ollama models (~/.ollama/models)                          -> drive
#   - atom-backups/ (DB snapshot mirror)                        -> drive
#
# Run this whenever memory/RAG features error, backups stop appearing, or
# Ollama/Docker misbehave. The overwhelmingly likely cause is the drive
# being unplugged or not yet mounted after reboot/replug.

set -u

DRIVE="/Volumes/Seagate Portable Drive"
FAIL=0

ok()   { echo "  OK    $1"; }
bad()  { echo "  FAIL  $1"; FAIL=1; }

echo "== External storage status =="
echo

echo "[1] Portable drive"
if [ -d "$DRIVE" ]; then
    ok "drive mounted at $DRIVE"
else
    bad "drive NOT mounted at $DRIVE"
    echo "        -> Replug the drive (or open Finder and select it)."
    echo "        -> macOS mounts it automatically a few seconds after plug-in."
fi
echo

echo "[2] LanceDB memory store (backend/data/atom_memory symlink)"
LINK="$HOME/projects/atom/backend/data/atom_memory"
if [ -L "$LINK" ] && [ -e "$LINK" ]; then
    ok "symlink resolves -> $(readlink "$LINK")"
elif [ -L "$LINK" ]; then
    bad "symlink is DANGLING (drive missing or renamed)"
    echo "        -> Remount the drive; the app recovers on its next use,"
    echo "           no restart needed. Data is on the drive, not lost."
else
    bad "$LINK is not a symlink (layout changed?)"
fi
echo

echo "[3] Backup mirror ($DRIVE/atom-backups)"
if [ -d "$DRIVE/atom-backups" ]; then
    N=$(ls "$DRIVE/atom-backups" 2>/dev/null | wc -l | tr -d ' ')
    NEWEST=$(ls -t "$DRIVE/atom-backups" 2>/dev/null | head -1)
    ok "$N snapshots (newest: ${NEWEST:-none})"
else
    bad "backup dir missing (drive missing, or never seeded)"
fi
echo

echo "[4] Ollama models on drive"
if [ -L "$HOME/.ollama/models" ] && [ -e "$HOME/.ollama/models" ]; then
    ok "symlink resolves -> $(readlink "$HOME/.ollama/models")"
elif [ -d "$HOME/.ollama/models" ]; then
    ok "present (local dir, not drive-hosted)"
else
    bad "models path missing — 'ollama list' will fail"
    echo "        -> Remount the drive."
fi
echo

echo "[5] Docker Desktop data folder"
SETTINGS="$HOME/Library/Group Containers/group.com.docker/settings-store.json"
if [ -f "$SETTINGS" ] && grep -q "Seagate" "$SETTINGS" 2>/dev/null; then
    if [ -d "$DRIVE/docker" ]; then
        ok "DataFolder on drive and present"
    else
        bad "DataFolder set to drive but $DRIVE/docker missing"
    fi
else
    ok "not drive-hosted (no action needed)"
fi
echo

echo "== Summary =="
if [ "$FAIL" -eq 0 ]; then
    echo "All external-storage checks passed."
else
    echo "One or more checks FAILED — see the '->' recovery notes above."
    echo "In most cases: replug the drive, wait ~10s, then re-run this script."
fi
exit "$FAIL"
