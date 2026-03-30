#!/bin/bash
set -e

INPUT=$(cat)
ERROR_MSG=$(echo "$INPUT" | jq -r '.error.message')
ERROR_NAME=$(echo "$INPUT" | jq -r '.error.name')
CWD=$(echo "$INPUT" | jq -r '.cwd')

LOG_DIR="${CWD}/.github/hooks/logs"
mkdir -p "$LOG_DIR"

echo "[$(date -u -Iseconds)] [$ERROR_NAME] $ERROR_MSG" >> "$LOG_DIR/errors.log"

exit 0
