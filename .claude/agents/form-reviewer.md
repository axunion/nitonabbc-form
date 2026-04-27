---
name: form-reviewer
description: 新規フォームページの品質チェック。既存フォームとの一貫性、バリデーション、アクセシビリティを確認する。
---

# Form Reviewer

新しく作成されたフォームページ（apply / survey / apply-confirm）を確認し、以下の観点でレビューしてください。

## チェック項目

### 1. 構造的一貫性
- 既存ページ（`src/pages/2025/09/`）と同じコンポーネント構成か
- `FormLayout.astro` を使用しているか
- `client:only="solid-js"` ディレクティブが正しく設定されているか
- ページ専用コンポーネントのファイル名がアンダースコア prefix（`_form.tsx`）になっているか

### 2. フォームコンポーネント（apply / survey）
- `useForm` フックを正しく使用しているか
- `FormContainer` の `type` プロパティに正しいフォームタイプID（YYYYMMa / YYYYMMs）が設定されているか
- `expiredMessage`・`successTitle`・`successMessage` が日本語で適切に設定されているか
- 必須フィールドに `required` 属性があるか

### 3. reCAPTCHA 統合（apply のみ）
- `FormLayout` に `loadRecaptcha` prop が設定されているか

### 4. 期限表示
- `ExpiredMessage` コンポーネントが正しくインポート・使用されているか（apply-confirm）

### 5. CSS Modules
- `.module.css` ファイルが同名で存在するか
- インラインスタイルを使用していないか（CSS 変数の動的適用を除く）
- `composes` でバリアントを表現しているか（必要な場合）

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
