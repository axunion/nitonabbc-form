#!/bin/sh
# PreToolUse hook: 過去イベントページへの Edit/Write をブロック（過去ページ残置ポリシー）
# exit 2 でツール呼び出しをブロックし、stderr に理由を出力する

f=$(jq -r '.tool_input.file_path // empty')
[ -z "$f" ] && exit 0

# src/pages/YYYY/MM/ パターン以外は対象外
echo "$f" | grep -qE 'src/pages/[0-9]{4}/[0-9]{2}/' || exit 0

year=$(echo "$f" | sed -E 's|.*src/pages/([0-9]{4})/([0-9]{2})/.*|\1|')
month=$(echo "$f" | sed -E 's|.*src/pages/([0-9]{4})/([0-9]{2})/.*|\2|')
page_ym="${year}${month}"
current_ym=$(date +%Y%m)

if [ "$page_ym" -lt "$current_ym" ]; then
  cat >&2 <<MSG
[過去ページ残置ポリシー] 編集対象: $f
このファイルは過去イベント（${year}/${month}）のページです。

意図的な変更（期限切れページへの変換など）の場合のみ続行してください。
期限切れ変換には past-page-guardian サブエージェントが利用できます。
MSG
  exit 2
fi
