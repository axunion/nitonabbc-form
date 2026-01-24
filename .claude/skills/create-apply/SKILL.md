---
name: create-apply
description: 新しいイベントの申込フォームを作成する
disable-model-invocation: true
---

# 申込フォーム作成スキル

イベントの参加申込フォームを作成します。

## 使い方

```
/create-apply YYYY/MM [イベント名] [開催日]
```

### 引数

- `YYYY/MM`: 必須。イベントの年月（例: 2026/03）
- `イベント名`: 任意。デフォルト: 京葉地区合同青年会
- `開催日`: 任意。デフォルト: YYYY年M月（日付未定）

### 例

```
/create-apply 2026/03
/create-apply 2026/03 京葉地区青年キャンプ 2026年3月15日〜16日
```

## 実行手順

1. `src/pages/$ARGUMENTS/` ディレクトリを作成
2. 以下のファイルをテンプレートから作成:
   - `apply.astro` - 申込ページ
   - `_apply-form.tsx` - 申込フォームコンポーネント
3. 引数に応じて以下を置換:
   - イベント名
   - 開催日
   - フォームタイプID（例: `202603a`）
   - 著作権年

## テンプレート

このディレクトリ内の以下のファイルをテンプレートとして使用:

- `apply.astro.template`
- `_apply-form.tsx.template`

テンプレート内のプレースホルダー:
- `{{YEAR}}` - 年（4桁）
- `{{MONTH}}` - 月（2桁、ゼロ埋め）
- `{{EVENT_NAME}}` - イベント名
- `{{EVENT_DATE}}` - 開催日
- `{{FORM_TYPE}}` - フォームタイプID（YYYYMMa形式）

## 注意事項

- survey（アンケート）は申込終了後に `/create-survey` で別途作成してください
- 作成後、フォームフィールドは必要に応じてカスタマイズしてください
