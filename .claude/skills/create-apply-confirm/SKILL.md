---
name: create-apply-confirm
description: 既存イベントの参加者確認リストページを作成する
---

# 参加者確認リスト作成スキル

イベントの参加申込確認リストページを作成します。

## 前提条件

- 対象の `YYYY/MM` ディレクトリに `apply.astro` が既に存在すること
- 申込フォームからイベント名・フォームタイプID・テーマ CSS・ページスタイルを自動取得します

## 使い方

```
/create-apply-confirm YYYY/MM
```

### 引数

- `YYYY/MM`: 必須。既存イベントの年月（例: 2026/03）

### 例

```
/create-apply-confirm 2026/03
```

## 実行手順

1. `git switch -c page/{{YEAR}}-{{MONTH}}-apply-confirm` でブランチを作成する。
   同名ブランチが既に存在する場合は `git switch page/{{YEAR}}-{{MONTH}}-apply-confirm` で切り替える。
   （`{{YEAR}}` / `{{MONTH}}` は引数から展開する）
2. `src/pages/$ARGUMENTS/apply.astro` から以下の情報を読み取る
   - イベント名
   - フォームタイプID
   - テーマ CSS の import 行（`import "@/styles/themes/...css"` の行をそのまま抽出する）
   - `<style>...</style>` ブロック全体をそのまま抽出する
3. 以下のファイルをテンプレートから作成:
   - `apply-confirm.astro` - 確認リストページ
   - `_confirm-list.tsx` - 確認リストコンポーネント
   - `_confirm-list.module.css` - スタイル
4. 読み取った情報でプレースホルダーを置換

## テンプレート

`templates/` ディレクトリ内の以下のファイルをテンプレートとして使用:

- `templates/apply-confirm.astro.template`
- `templates/_confirm-list.tsx.template`
- `templates/_confirm-list.module.css.template`

テンプレート内のプレースホルダー:
- `{{YEAR}}` - 年（4桁）
- `{{MONTH}}` - 月（2桁、ゼロ埋め）
- `{{EVENT_NAME}}` - イベント名（apply.astroから取得）
- `{{FORM_TYPE}}` - フォームタイプID（YYYYMMa形式）
- `{{THEME_IMPORT}}` - テーマ CSS の import 行（apply.astroから抽出した行そのまま）
- `{{PAGE_STYLES}}` - `<style>...</style>` ブロック全体（apply.astroから抽出してそのまま貼り付ける）

## 注意事項

- 申込フォーム（apply）が存在しない場合はエラー
- `apply-confirm.astro` の `<style>` は apply.astro から `{{PAGE_STYLES}}` としてそのまま引き継ぐ。HTML 構造の差異（クラス名の追加・削除など）がある場合のみ最小限の調整を行うこと（`docs/design-policy.md` 参照）
- `_confirm-list.tsx` の列定義（`ConfirmListItem` 型と `I` オブジェクト）はイベントごとの申込項目に合わせてカスタマイズが必要
- イベント終了後は `apply-confirm.astro` の `<ConfirmList>` を `<ExpiredMessage>` に差し替えることを推奨（過去ページは削除せず残す運用のため）
- 計算・条件分岐など `if` / `switch` / `reduce` を含むロジックは `_calc-<feature>.ts` にエクスポートし、JSX からは関数呼び出しのみにすること（`form-test-writer` でテスト生成の対象になる）

## 生成後の次ステップ

フォームに集計・条件分岐ロジックが含まれる場合は、生成後に以下を実行してください：

```
/form-test-writer
```
