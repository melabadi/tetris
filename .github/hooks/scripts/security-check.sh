#!/bin/bash
set -e

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
TOOL_ARGS=$(echo "$INPUT" | jq -r '.toolArgs')
CWD=$(echo "$INPUT" | jq -r '.cwd')

# Block dangerous shell commands
if [ "$TOOL_NAME" = "bash" ] || [ "$TOOL_NAME" = "shell" ]; then
  COMMAND=$(echo "$TOOL_ARGS" | jq -r '.command // empty')

  # Block destructive commands
  if echo "$COMMAND" | grep -qEi "rm -rf /|rm -rf \.|format |mkfs|dd if=|:(){ :|DROP TABLE|TRUNCATE"; then
    echo '{"permissionDecision":"deny","permissionDecisionReason":"Destructive command blocked by security hook"}'
    exit 0
  fi

  # Block credential/secret exposure
  if echo "$COMMAND" | grep -qEi "cat.*\.env|cat.*/etc/shadow|cat.*/etc/passwd|printenv.*SECRET|printenv.*TOKEN|printenv.*KEY"; then
    echo '{"permissionDecision":"deny","permissionDecisionReason":"Accessing secrets/credentials is not allowed"}'
    exit 0
  fi
fi

# Restrict file edits to project directories only
if [ "$TOOL_NAME" = "edit" ] || [ "$TOOL_NAME" = "create" ]; then
  FILE_PATH=$(echo "$TOOL_ARGS" | jq -r '.path // .file_path // empty')

  if [ -n "$FILE_PATH" ]; then
    # Block editing outside the project
    case "$FILE_PATH" in
      /etc/*|/usr/*|/var/*|/bin/*|/sbin/*|C:\\Windows\\*|C:\\Program\ Files\\*)
        echo '{"permissionDecision":"deny","permissionDecisionReason":"Cannot edit system files"}'
        exit 0
        ;;
    esac
  fi
fi

# Allow by default
exit 0
