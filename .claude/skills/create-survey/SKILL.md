---
name: create-survey
description: 既存イベントのアンケートフォームを作成する
disable-model-invocation: true
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
3. 読み取った情報でプレースホルダーを置換

## テンプレート

このディレクトリ内の以下のファイルをテンプレートとして使用:

- `survey.astro.template`
- `_survey-form.tsx.template`

テンプレート内のプレースホルダー:
- `{{YEAR}}` - 年（4桁）
- `{{MONTH}}` - 月（2桁、ゼロ埋め）
- `{{EVENT_NAME}}` - イベント名（apply.astroから取得）
- `{{EVENT_DATE}}` - 開催日（apply.astroから取得）
- `{{FORM_TYPE}}` - フォームタイプID（YYYYMMs形式）

## 注意事項

- 申込フォーム（apply）が存在しない場合はエラー
- 作成後、アンケート項目は必要に応じてカスタマイズしてください
