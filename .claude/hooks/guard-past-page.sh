#!/bin/sh
# PreToolUse hook: blocks Edit/Write to past event pages (past-page retention policy)
# exit 2 blocks the tool call; the reason is written to stderr
# Note: path is pre-filtered to src/pages/*/*/** by the `if` condition in settings.json

f=$(jq -r '.tool_input.file_path // empty')
[ -z "$f" ] && exit 0

year=$(echo "$f" | sed -E 's|.*src/pages/([0-9]{4})/([0-9]{2})/.*|\1|')
month=$(echo "$f" | sed -E 's|.*src/pages/([0-9]{4})/([0-9]{2})/.*|\2|')

# if path doesn't match YYYY/MM pattern, sed returns the input unchanged
[ ${#year} -ne 4 ] && exit 0

page_ym="${year}${month}"
current_ym=$(date +%Y%m)

if [ "$page_ym" -lt "$current_ym" ]; then
  cat >&2 <<MSG
[Past Page Retention Policy] Target file: $f
This file belongs to a past event (${year}/${month}).

Proceed only if the change is intentional (e.g., converting to an expired page).
Use the past-page-guardian subagent for expired-page conversion.
MSG
  exit 2
fi
