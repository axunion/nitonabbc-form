#!/bin/sh
# PostToolUse hook: 編集後チェック
#   .ts/.tsx/.astro/.css → biome check --write（自動修正）
#   .astro              → astro check（型チェック）

f=$(jq -r '.tool_input.file_path // empty')
[ -z "$f" ] && exit 0

if echo "$f" | grep -qE '\.(ts|tsx|astro|css)$'; then
  pnpm exec biome check --write "$f" 2>/dev/null || true
fi

if echo "$f" | grep -qE '\.astro$'; then
  pnpm exec astro check 2>&1
fi
