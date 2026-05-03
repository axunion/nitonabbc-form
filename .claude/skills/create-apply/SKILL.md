---
name: create-apply
description: 新しいイベントの申込フォームを作成する
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
   - `_apply-form.module.css` - フォームスタイル
   - `_input.tsx` - 入力コンポーネント
   - `_input.module.css` - 入力スタイル
   - `_radio-group.tsx` - ラジオグループコンポーネント
   - `_radio-group.module.css` - ラジオグループスタイル
   - `_submit-button.tsx` - 送信ボタンコンポーネント
   - `_submit-button.module.css` - 送信ボタンスタイル
   - `_textarea.tsx` - テキストエリアコンポーネント
   - `_textarea.module.css` - テキストエリアスタイル
3. 引数に応じて以下を置換:
   - イベント名
   - 開催日
   - フォームタイプID（例: `202603a`）
   - 著作権年

## テンプレート

`templates/` ディレクトリ内の以下のファイルをテンプレートとして使用:

- `templates/apply.astro.template`
- `templates/_apply-form.tsx.template`
- `templates/_apply-form.module.css.template`
- `templates/_input.tsx.template`
- `templates/_input.module.css.template`
- `templates/_radio-group.tsx.template`
- `templates/_radio-group.module.css.template`
- `templates/_submit-button.tsx.template`
- `templates/_submit-button.module.css.template`
- `templates/_textarea.tsx.template`
- `templates/_textarea.module.css.template`

テンプレート内のプレースホルダー:
- `{{YEAR}}` - 年（4桁）
- `{{MONTH}}` - 月（2桁、ゼロ埋め）
- `{{EVENT_NAME}}` - イベント名
- `{{EVENT_DATE}}` - 開催日
- `{{FORM_TYPE}}` - フォームタイプID（YYYYMMa形式）

## 注意事項

- テンプレートの CSS はあくまで出発点。**他のページのデザインを参考にせず**、イベントごとに独自のスタイルを `<style>` で定義すること（`docs/design-policy.md` 参照）
- `_input.tsx` / `_submit-button.tsx` 等の UI コンポーネントはページ専用。他ページのものを共有しない
- `_radio-group` / `_submit-button` / `_textarea` のテンプレートは `create-survey` スキルにも同一内容で存在する。片方を変更した場合はもう片方も同期すること
- survey（アンケート）は申込終了後に `/create-survey` で別途作成してください
- 作成後、フォームフィールドは必要に応じてカスタマイズしてください
- 計算・条件分岐など `if` / `switch` / `reduce` を含むロジックは `_calc-<feature>.ts` にエクスポートし、JSX からは関数呼び出しのみにすること（`form-test-writer` でテスト生成の対象になる）

## 生成後の次ステップ

フォームに計算ロジック（参加費計算・人数による条件分岐など）が含まれる場合は、生成後に以下を実行してください：

```
/form-test-writer
```
