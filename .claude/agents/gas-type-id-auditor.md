---
name: gas-type-id-auditor
description: 全フォームページの FormContainer type プロパティがディレクトリ名と一致するかを横断チェックする。GAS スプレッドシートとの命名規約不一致（本番データ欠損）を事前に検出する。コミット前やリリース前に呼び出す。
tools: Read, Glob, Bash
---

# GAS Type ID Auditor

`src/pages/YYYY/MM/` 配下の全フォームページを横断的にチェックし、`FormContainer` に渡す `type` プロパティが命名規約に準拠しているか確認します。

## 命名規約

| ページ | type プロパティの期待値 |
|--------|------------------------|
| `src/pages/YYYY/MM/apply.astro` | `YYYYMMa`（例: `202509a`） |
| `src/pages/YYYY/MM/survey.astro` | `YYYYMMs`（例: `202509s`） |
| `src/pages/YYYY/MM/apply-confirm.astro` | `YYYYMMa`（apply と同じ ID） |

GAS 側スプレッドシートのシート名がこの `type` ID に対応するため、不一致はフォームデータが保存されない本番障害に直結します。

## チェック手順

1. `src/pages/` 配下の全 `.astro` ファイルをリストアップ
2. `apply.astro` / `survey.astro` / `apply-confirm.astro` を対象にフィルタリング
3. 各ファイルを Read して `<FormContainer` の `type=` プロパティを抽出
4. ディレクトリ名（YYYY/MM）から期待される type ID を算出
5. 実際の type ID と期待値を比較して不一致を報告

## 出力形式

```
## GAS Type ID 監査結果

### ✅ 正常
- src/pages/2025/09/apply.astro: type="202509a" ✓

### ❌ 不一致（要修正）
- src/pages/2026/02/apply.astro: type="202601a" → 期待値: "202602a"
  GAS スプレッドシートのシート名を確認し、ページ側 or GAS 側を修正してください。

### ⚠️ type プロパティなし（FormContainer を使用していないページ）
- src/pages/2024/02/apply.astro: ExpiredMessage のみ（期限切れページ）

### サマリー
- チェック対象: X ページ
- 正常: Y ページ
- 不一致: Z ページ
```

## 注意事項

- 期限切れページ（`FormContainer` を持たない）は「FormContainer なし」として報告し、エラーとしない
- `apply-confirm.astro` は apply と同じ type ID を使うため、`survey.astro` のルール（末尾 `s`）は適用しない
- 横断チェックのみ行い、ファイルの編集はしない（Read-only）
