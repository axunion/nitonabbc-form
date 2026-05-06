---
name: create-survey
description: 既存イベントのアンケートフォームを作成する
---

# アンケートフォーム作成スキル

イベント終了後のアンケートフォームを作成します。

## 前提条件

- 対象の `YYYY/MM` ディレクトリに `apply.astro` が既に存在すること
- 申込フォームからイベント名・開催日・テーマ CSS・ページスタイルを自動取得します

## 使い方

```
/create-survey YYYY/MM
```

### 引数

- `YYYY/MM`: 必須。既存イベントの年月（例: 2026/03）

### 例

```
/create-survey 2026/03
```

## 実行手順

1. `git switch -c page/{{YEAR}}-{{MONTH}}-survey` でブランチを作成する。
   同名ブランチが既に存在する場合は `git switch page/{{YEAR}}-{{MONTH}}-survey` で切り替える。
   （`{{YEAR}}` / `{{MONTH}}` は引数から展開する）
2. `src/pages/$ARGUMENTS/apply.astro` から以下の情報を読み取る
   - イベント名（`<h1>` タグ等から）
   - 開催日
   - テーマ CSS の import 行（`import "@/styles/themes/...css"` の行をそのまま抽出する）
   - `<style>...</style>` ブロック全体をそのまま抽出する
3. 以下のファイルをテンプレートから作成:
   - `survey.astro` - アンケートページ
   - `_survey-form.tsx` - アンケートフォームコンポーネント
   - `_survey-form.module.css` - フォームスタイル
   - `_radio-group.tsx` - ラジオグループコンポーネント（**既に存在する場合はスキップ**）
   - `_radio-group.module.css` - ラジオグループスタイル（**既に存在する場合はスキップ**）
   - `_submit-button.tsx` - 送信ボタンコンポーネント（**既に存在する場合はスキップ**）
   - `_submit-button.module.css` - 送信ボタンスタイル（**既に存在する場合はスキップ**）
   - `_textarea.tsx` - テキストエリアコンポーネント（**既に存在する場合はスキップ**）
   - `_textarea.module.css` - テキストエリアスタイル（**既に存在する場合はスキップ**）
4. 読み取った情報でプレースホルダーを置換

## テンプレート

`templates/` ディレクトリ内の以下のファイルをテンプレートとして使用:

- `templates/survey.astro.template`
- `templates/_survey-form.tsx.template`
- `templates/_survey-form.module.css.template`
- `templates/_radio-group.tsx.template`
- `templates/_radio-group.module.css.template`
- `templates/_submit-button.tsx.template`
- `templates/_submit-button.module.css.template`
- `templates/_textarea.tsx.template`
- `templates/_textarea.module.css.template`

テンプレート内のプレースホルダー:
- `{{YEAR}}` - 年（4桁）
- `{{MONTH}}` - 月（2桁、ゼロ埋め）
- `{{EVENT_NAME}}` - イベント名（apply.astroから取得）
- `{{EVENT_DATE}}` - 開催日（apply.astroから取得）
- `{{FORM_TYPE}}` - フォームタイプID（YYYYMMs形式）
- `{{THEME_IMPORT}}` - テーマ CSS の import 行（apply.astroから抽出した行そのまま）
- `{{PAGE_STYLES}}` - `<style>...</style>` ブロック全体（apply.astroから抽出してそのまま貼り付ける）

## 注意事項

- 申込フォーム（apply）が存在しない場合はエラー
- `survey.astro` の `<style>` は apply.astro から `{{PAGE_STYLES}}` としてそのまま引き継ぐ。HTML 構造の差異（クラス名の追加・削除など）がある場合のみ最小限の調整を行うこと（`docs/design-policy.md` 参照）
- `_radio-group.tsx` / `_submit-button.tsx` 等の UI コンポーネントはページ専用。他ページのものを共有しない
- `_radio-group` / `_submit-button` / `_textarea` は `create-apply` が先に実行されている場合に既存ファイルが存在する。その場合はスキップし、上書きしないこと
- 作成後、アンケート項目は必要に応じてカスタマイズしてください
- 計算・条件分岐など `if` / `switch` / `reduce` を含むロジックは `_calc-<feature>.ts` にエクスポートし、JSX からは関数呼び出しのみにすること（`form-test-writer` でテスト生成の対象になる）

## 生成後の次ステップ

フォームに集計・条件分岐ロジックが含まれる場合は、生成後に以下を実行してください：

```
/form-test-writer
```
