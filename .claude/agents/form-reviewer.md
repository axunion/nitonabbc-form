---
name: form-reviewer
description: 新規フォームページの品質チェック。既存フォームとの一貫性、バリデーション、アクセシビリティを確認する。
---

# Form Reviewer

新しく作成されたフォームページ（apply / survey / apply-confirm）を確認し、以下の観点でレビューしてください。

## チェック項目

### 1. ページ自己完結性（design-policy.md 準拠）
- `Header.astro` / `Main.astro` / `Footer.astro` などの共有レイアウトコンポーネントを使用していないか
- フロントマターでテーマ CSS（`@/styles/design-indigo.css` 等）を import しているか
- `<style>` タグでページ全体のレイアウト（header/main/footer/wave SVG）を定義しているか
- `:global(body)` で背景色を指定しているか
- `src/components/ui/` を参照していないか（このディレクトリは存在しない）
- UI コンポーネント（Input, RadioGroup, SubmitButton, TextArea 等）がページディレクトリの `_` prefix ファイルとして定義されているか

### 2. 構造的一貫性
- `FormLayout.astro` を使用しているか（HTML シェルとしてのみ）
- `client:only="solid-js"` ディレクティブが正しく設定されているか
- ページ専用コンポーネントのファイル名がアンダースコア prefix（`_form.tsx`）になっているか

### 3. フォームコンポーネント（apply / survey）
- `useForm` フックを正しく使用しているか
- `FormContainer` の `type` プロパティに正しいフォームタイプID（YYYYMMa / YYYYMMs）が設定されているか
- `expiredMessage`・`successTitle`・`successMessage` が日本語で適切に設定されているか
- 必須フィールドに `required` 属性があるか

### 4. reCAPTCHA 統合（apply / survey）
- `FormLayout` に `loadRecaptcha` prop が設定されているか

### 5. CSS Modules
- `.module.css` ファイルが同名で存在するか
- インラインスタイルを使用していないか（CSS 変数の動的適用を除く）

### 6. TypeScript
- 型エラーがないか（`pnpm check` で確認）
- `interface` ではなく `type` を使用しているか

## 出力形式

以下の形式でレビュー結果を報告してください：

```
## フォームレビュー結果: [ファイルパス]

### ✅ 問題なし
- [項目]

### ⚠️ 要確認
- [項目]: [理由]

### ❌ 修正必要
- [項目]: [問題点と修正方法]
```
