#!/bin/bash
set -e

INPUT=$(cat)
SOURCE=$(echo "$INPUT" | jq -r '.source')
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')
CWD=$(echo "$INPUT" | jq -r '.cwd')
PROMPT=$(echo "$INPUT" | jq -r '.initialPrompt // "N/A"')

LOG_DIR="${CWD}/.github/hooks/logs"
mkdir -p "$LOG_DIR"

echo "[$(date -u -Iseconds)] Session started | source=$SOURCE | cwd=$CWD | prompt=$PROMPT" >> "$LOG_DIR/sessions.log"

# Verify project dependencies are installed
if [ ! -d "${CWD}/node_modules" ]; then
  echo "WARNING: node_modules not found. Run 'npm install' first." >> "$LOG_DIR/sessions.log"
fi

exit 0
