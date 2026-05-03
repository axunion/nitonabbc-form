---
name: create-survey
description: 既存イベントのアンケートフォームを作成する
---

# アンケートフォーム作成スキル

イベント終了後のアンケートフォームを作成します。

## 前提条件

- 対象の `YYYY/MM` ディレクトリに `apply.astro` が既に存在すること
- 申込フォームからイベント名・開催日を自動取得します

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

1. `src/pages/$ARGUMENTS/apply.astro` からイベント情報を読み取る
2. 以下のファイルをテンプレートから作成:
   - `survey.astro` - アンケートページ
   - `_survey-form.tsx` - アンケートフォームコンポーネント
   - `_survey-form.module.css` - フォームスタイル
   - `_radio-group.tsx` - ラジオグループコンポーネント
   - `_radio-group.module.css` - ラジオグループスタイル
   - `_submit-button.tsx` - 送信ボタンコンポーネント
   - `_submit-button.module.css` - 送信ボタンスタイル
   - `_textarea.tsx` - テキストエリアコンポーネント
   - `_textarea.module.css` - テキストエリアスタイル
3. 読み取った情報でプレースホルダーを置換

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

## 注意事項

- 申込フォーム（apply）が存在しない場合はエラー
- テンプレートの CSS はあくまで出発点。**他のページのデザインを参考にせず**、イベントごとに独自のスタイルを `<style>` で定義すること（`docs/design-policy.md` 参照）
- `_radio-group.tsx` / `_submit-button.tsx` 等の UI コンポーネントはページ専用。他ページのものを共有しない
- `_radio-group` / `_submit-button` / `_textarea` のテンプレートは `create-apply` スキルにも同一内容で存在する。片方を変更した場合はもう片方も同期すること
- 作成後、アンケート項目は必要に応じてカスタマイズしてください
- 計算・条件分岐など `if` / `switch` / `reduce` を含むロジックは `_calc-<feature>.ts` にエクスポートし、JSX からは関数呼び出しのみにすること（`form-test-writer` でテスト生成の対象になる）

## 生成後の次ステップ

フォームに集計・条件分岐ロジックが含まれる場合は、生成後に以下を実行してください：

```
/form-test-writer
```
