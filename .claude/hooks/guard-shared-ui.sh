#!/bin/sh
# PreToolUse hook: src/components/ui/ への Write をブロック（ページ独立デザイン方針）
# exit 2 でツール呼び出しをブロックし、stderr に理由を出力する

f=$(jq -r '.tool_input.file_path // empty')
[ -z "$f" ] && exit 0

if echo "$f" | grep -qE '(^|/)src/components/ui(/|$)'; then
  cat >&2 <<MSG
[ページ独立デザイン方針違反] 編集対象: $f
src/components/ui/ への共有 UI コンポーネント作成は禁止されています。

UI コンポーネントは各ページディレクトリ（src/pages/YYYY/MM/）に
_ prefix のページ専用ファイルとして作成してください（例: _input.tsx）。
MSG
  exit 2
fi
