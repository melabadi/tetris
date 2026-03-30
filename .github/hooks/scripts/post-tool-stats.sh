#!/bin/bash
set -e

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
RESULT_TYPE=$(echo "$INPUT" | jq -r '.toolResult.resultType')
CWD=$(echo "$INPUT" | jq -r '.cwd')
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')

LOG_DIR="${CWD}/.github/hooks/logs"
mkdir -p "$LOG_DIR"

# Write CSV stats
echo "${TIMESTAMP},${TOOL_NAME},${RESULT_TYPE}" >> "$LOG_DIR/tool-stats.csv"

# Log failures with details
if [ "$RESULT_TYPE" = "failure" ]; then
  RESULT_TEXT=$(echo "$INPUT" | jq -r '.toolResult.textResultForLlm')
  echo "[$(date -u -Iseconds)] FAILURE: tool=$TOOL_NAME result=$RESULT_TEXT" >> "$LOG_DIR/failures.log"
fi

exit 0
