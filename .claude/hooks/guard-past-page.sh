#!/bin/sh
# PreToolUse hook: asks for user confirmation before Edit/Write to past event pages
# (past-page retention policy). Past pages are frozen by convention, but intentional
# changes (fixing a mistake, expired-page conversion) are fine — so this emits a
# permissionDecision "ask" (JSON on stdout, exit 0) instead of hard-blocking.
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
  reason="[Past Page Retention Policy] $f belongs to a past event (${year}/${month}). Past pages are kept frozen for bookmarked participants — approve only if this change is intentional (e.g. fixing a mistake or converting to an expired page)."
  jq -n --arg reason "$reason" '{hookSpecificOutput: {hookEventName: "PreToolUse", permissionDecision: "ask", permissionDecisionReason: $reason}}'
fi
exit 0
