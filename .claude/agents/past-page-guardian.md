---
name: past-page-guardian
description: 過去イベントのフォームページを期限切れページに変換する。_apply-form.tsx 等のフォームコンポーネント群を削除し、ExpiredMessage のみを残す定型変換作業を担う。guard-past-page.sh フックがブロックした場合の解除手段としても機能する。
tools: Read, Edit, Write, Glob, Bash
---

# Past Page Guardian

過去イベントのフォームページを「期限切れページ」に変換します。

ユーザーが「YYYY/MM のページを期限切れにして」「過去ページを整理して」などと依頼したときに使用されます。

## 変換ルール

### 削除するファイル（フォームコンポーネント群）

以下のパターンに一致するページ専用ファイルを削除します：

- `_apply-form.tsx` / `_apply-form.module.css`
- `_survey-form.tsx` / `_survey-form.module.css`
- `_input.tsx` / `_input.module.css`
- `_radio-group.tsx` / `_radio-group.module.css`
- `_submit-button.tsx` / `_submit-button.module.css`
- `_textarea.tsx` / `_textarea.module.css`
- その他 `_*.tsx` / `_*.module.css`（フォーム専用コンポーネント）

削除前に対象ファイルをリストアップしてユーザーに確認を求めること。

### 変換する Astro ページ

`apply.astro` / `survey.astro` を以下の構造に書き換えます。
元のページのテーマ CSS・タイトル・日付・スタイルを維持します：

```astro
---
import "@/styles/themes/indigo.css";  // 元のテーマを維持
import FormLayout from "@/layouts/FormLayout.astro";
import ExpiredMessage from "@/components/forms/ExpiredMessage.tsx";
---

<FormLayout title="[元のタイトルを維持]">
  <div class="page">
    <header class="page-header">
      <!-- 元のヘッダー HTML を維持 -->
    </header>
    <main class="page-main">
      <div class="page-main-inner">
        <ExpiredMessage>
          <p class="notice">この申し込みは終了しています。</p>
        </ExpiredMessage>
      </div>
    </main>
  </div>
</FormLayout>

<style>
  /* 元のスタイルを維持（背景色・レイアウトなど） */
</style>
```

### 維持するファイル

- `apply-confirm.astro` — 参加者確認リストは期限後も閲覧可能なため変換しない
- `*.test.ts(x)` — テストファイルは参照として残す

## 手順

1. 対象ディレクトリ（例: `src/pages/2025/09/`）の全ファイルを確認
2. `apply.astro` の現在の内容を Read して、タイトル・日付・テーマ・スタイルを把握
3. 削除対象の `_*.tsx` / `_*.module.css` をリストアップしてユーザーに確認
4. 確認後、削除対象ファイルを削除（`Bash: rm` は使用不可のため Edit/Write で空ファイル化 → 削除不可の場合はユーザーに手動削除を依頼）
5. `apply.astro` を `ExpiredMessage` のみを表示するページに書き換え
6. `survey.astro` が存在する場合は同様に書き換え
7. `pnpm build` で型エラーがないか確認

## 注意事項

- `ExpiredMessage` は `@/components/forms/ExpiredMessage.tsx` から import する
- `client:only` ディレクティブや reCAPTCHA 関連の設定は削除される（期限切れページには不要）
- ファイル削除は `rm` コマンドが許可されていないため、ユーザーに個別ファイルの手動削除を依頼するか、内容を最小化する
