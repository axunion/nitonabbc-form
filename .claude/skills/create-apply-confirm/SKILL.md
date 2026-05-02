---
name: create-apply-confirm
description: 既存イベントの参加者確認リストページを作成する
---

# 参加者確認リスト作成スキル

イベントの参加申込確認リストページを作成します。

## 前提条件

- 対象の `YYYY/MM` ディレクトリに `apply.astro` が既に存在すること
- 申込フォームからイベント名・フォームタイプIDを自動取得します

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

1. `src/pages/$ARGUMENTS/apply.astro` からイベント情報を読み取る
2. 以下のファイルをテンプレートから作成:
   - `apply-confirm.astro` - 確認リストページ
   - `_confirm-list.tsx` - 確認リストコンポーネント
   - `_confirm-list.module.css` - スタイル
3. 読み取った情報でプレースホルダーを置換

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

## 注意事項

- 申込フォーム（apply）が存在しない場合はエラー
- テンプレートの CSS はあくまで出発点。**他のページのデザインを参考にせず**、イベントごとに独自のスタイルを `<style>` で定義すること（`docs/design-policy.md` 参照）
- `_confirm-list.tsx` の列定義（`ConfirmListItem` 型と `I` オブジェクト）はイベントごとの申込項目に合わせてカスタマイズが必要
- イベント終了後は `apply-confirm.astro` の `<ConfirmList>` を `<ExpiredMessage>` に差し替えることを推奨（過去ページは削除せず残す運用のため）
