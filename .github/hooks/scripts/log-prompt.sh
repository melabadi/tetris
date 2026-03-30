#!/bin/bash
set -e

INPUT=$(cat)
PROMPT=$(echo "$INPUT" | jq -r '.prompt')
CWD=$(echo "$INPUT" | jq -r '.cwd')
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')

LOG_DIR="${CWD}/.github/hooks/logs"
mkdir -p "$LOG_DIR"

echo "[$(date -u -Iseconds)] Prompt: $PROMPT" >> "$LOG_DIR/prompts.log"

exit 0
