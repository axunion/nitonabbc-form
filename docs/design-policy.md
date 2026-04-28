# デザイン方針

## 基本方針

各イベントのフォームページは**独立したサイト**として扱う。Astro のページは本来独立しているため、この方針はその性質を活かすものである。

イベントごとにデザインが異なることを前提とし、視覚的な共通化は行わない。共有するのは技術的なインフラのみとする。

---

## 共有レイヤー（全ページ共通）

技術的な基盤のみを共有する。視覚的な意見は持たない。

### `src/layouts/FormLayout.astro`

HTML シェルとしてのみ使用する。

- `<!doctype html>` / `<head>` / `<body>` の骨格
- `global.css` の読み込み
- reCAPTCHA スクリプトの条件付き読み込み
- 開発時の `DevApiToggle`

ページ背景色・レイアウト・フォントなどの視覚的スタイルは含まない。

### `src/styles/global.css`

CSS リセットとデザイントークン（CSS 変数）を定義する。デザイントークンはパレットとして提供するもので、各ページが必要に応じて参照する。強制ではない。

### `src/components/forms/`

フォームの状態管理・UX に関わる機能コンポーネント。デザインから独立しており、全ページで共有する。

| コンポーネント | 役割 |
|---|---|
| `FormContainer` | 期限チェック・送信状態のオーケストレーター |
| `FormField` | ラベル・エラー表示のラッパー |
| `ExpiredMessage` | フォーム終了メッセージ |
| `SubmissionLoader` | 送信中オーバーレイ |
| `SuccessMessage` / `ErrorMessage` | 送信結果メッセージ |
| `RecaptchaNotice` | reCAPTCHA 注記 |

### `src/services/`, `src/hooks/`, `src/config/`, `src/utils/`

変更なし。全ページで共有する。

---

## ページレイヤー（各イベント固有）

各ページが自己完結する。他のページへの依存を持たない。

### レイアウト

`Header.astro` / `Main.astro` / `Footer.astro` などの共有レイアウトコンポーネントは使用しない。各ページが `FormLayout.astro` を使いながら、自身の HTML 構造を直接定義する。

### スタイル

- Astro ページ（`.astro`）: `<style>` タグでページ全体のデザインを定義
- SolidJS コンポーネント（`.tsx`）: ページと同階層に `.module.css` を配置

### UI コンポーネント

`Input` / `Select` / `Checkbox` / `SubmitButton` などの入力パーツは**共有しない**。各イベントのページディレクトリに必要なものを配置する。

```
src/pages/YYYY/MM/
  apply.astro
  _apply-form.tsx
  _apply-form.module.css
  _input.tsx          ← ページ固有の UI コンポーネント
  _input.module.css
  _select.tsx
  _select.module.css
  ...
```

`_` prefix はページ専用ファイルであることを示す（CLAUDE.md の規約に準拠）。

---

## 既存ページの扱い

`2024/02`, `2024/09`, `2025/05`, `2025/09`, `2026/02` の各ページはフォームが終了済みである。

これらのページは以下の条件を満たせばよい:

- 見た目が変わらないこと
- `Header.astro` / `Main.astro` / `Footer.astro` への依存をなくし、ページ内で自己完結すること
- フォームが終了しているため `_apply-form.tsx` / `_survey-form.tsx` 等の form パーツは不要
- `ExpiredMessage` コンポーネントのみ使用する

各ページ間でスタイルが重複していることは許容する。

---

## 新規ページ作成の流れ

1. `src/pages/YYYY/MM/` にディレクトリを作成
2. `apply.astro` を作成し `FormLayout.astro` を使用
3. ページ固有のデザインを `<style>` で定義（他のページを参考にしない）
4. 必要な UI コンポーネントをページディレクトリに `_` prefix で作成
5. `_apply-form.tsx` + `_apply-form.module.css` でフォームを実装
6. `FormContainer` に `type`（フォームタイプ ID）を渡す

---

## 削除対象

この方針への移行に伴い、以下は削除する。

| 対象 | 理由 |
|---|---|
| `src/components/layout/Header.astro` | 既存ページをインライン化後に削除 |
| `src/components/layout/Main.astro` | 同上 |
| `src/components/layout/Footer.astro` | 同上 |
| `src/components/ui/` | 新規ページはページ内に持つ。既存ページ移行後に削除 |
