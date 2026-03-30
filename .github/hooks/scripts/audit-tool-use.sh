#!/bin/bash
set -e

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
TOOL_ARGS=$(echo "$INPUT" | jq -r '.toolArgs')
CWD=$(echo "$INPUT" | jq -r '.cwd')
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')

LOG_DIR="${CWD}/.github/hooks/logs"
mkdir -p "$LOG_DIR"

jq -n \
  --arg ts "$TIMESTAMP" \
  --arg tool "$TOOL_NAME" \
  --arg args "$TOOL_ARGS" \
  '{timestamp: $ts, event: "pre-tool-use", tool: $tool, args: $args}' >> "$LOG_DIR/audit.jsonl"

exit 0
