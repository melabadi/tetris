#!/bin/bash
set -e

INPUT=$(cat)
REASON=$(echo "$INPUT" | jq -r '.reason')
CWD=$(echo "$INPUT" | jq -r '.cwd')

LOG_DIR="${CWD}/.github/hooks/logs"
mkdir -p "$LOG_DIR"

echo "[$(date -u -Iseconds)] Session ended | reason=$REASON" >> "$LOG_DIR/sessions.log"

# Cleanup any temp files created during the session
rm -rf /tmp/tetris-agent-* 2>/dev/null || true

exit 0
