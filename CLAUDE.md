# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

イベント申込フォームとアンケートフォームを作成するプロジェクト。Google Apps Script と Google Spreadsheet でデータを管理する。

## Tech Stack

- **Astro 5** - Islands Architecture によるスタティックサイトジェネレーター
- **SolidJS** - 細粒度リアクティビティを持つ UI ライブラリ
- **LightningCSS** - CSS トランスパイラー/ミニファイアー（Vite 組み込み）
- **CSS Modules** - スコープド CSS（SolidJS コンポーネントは `.module.css`、Astro コンポーネントはスコープド `<style>`）
- **Biome** - フォーマッター/リンター（ESLint/Prettier の代替）
- **pnpm** - パッケージマネージャー
- **Node.js 24** - Volta でバージョン固定

## Commands

```bash
# 開発
pnpm dev              # 開発サーバー起動
pnpm build            # 本番ビルド
pnpm preview          # 本番ビルドのプレビュー

# コード品質
pnpm check            # Biome リント・フォーマット + Astro 型チェック
pnpm fix              # Biome 自動修正

# テスト（Vitest）
pnpm test             # テスト実行
pnpm test:watch       # ウォッチモード
pnpm test src/pages/2025/09/_calc-total.test.ts  # 単一ファイル実行例
```

## Architecture

### Islands Architecture

- ページは静的 HTML、インタラクティブな部分のみ SolidJS でハイドレーション
- フォームコンポーネントは `client:only="solid-js"` ディレクティブを使用
- クライアントサイド JS を最小限に抑える設計

### URL Pattern

`/YYYY/MM/(apply|survey|apply-confirm)`
- `apply` - イベント申込フォーム
- `survey` - イベント後アンケート
- `apply-confirm` - 参加者確認リスト

### Key Directories

```
src/
├── pages/YYYY/MM/       # 日付ベースのフォームページ（各ページが自己完結）
│   ├── apply.astro      # 申込ページ（Astro、レイアウト CSS を <style> で完全定義）
│   ├── _apply-form.tsx  # フォーム実装（SolidJS、_ prefix = ページ専用）
│   ├── _input.tsx       # ページ固有 UI コンポーネント（_ prefix）
│   └── ...              # その他ページ専用ファイル
├── components/
│   ├── forms/           # フォーム状態管理コンポーネント（全ページ共有）
│   └── dev/             # 開発用ツール
├── dev/                 # 開発時のみ有効な資材（本番ビルド対象外）
│   └── index.astro      # dev時の `/` ページ一覧（astro.config.mjs から injectRoute）
├── hooks/               # SolidJS カスタムフック
├── services/            # 外部 API 連携
├── layouts/             # Astro レイアウトテンプレート（HTML シェルのみ）
└── config/              # 設定ファイル
```

### State Management

- `useForm` - フォーム状態管理（createStore + createSignal）
- `useExpirationStatus` - フォーム期限チェック（createResource）
- `useDataFetch` - 確認データ取得（createResource）
- `useScrollLock` - 送信中のスクロール防止

### Data Flow

1. ページ読み込み（静的 Astro）
2. `useExpirationStatus` で期限チェック
3. `useForm` でフォーム状態管理
4. 送信時: バリデーション → reCAPTCHA トークン取得 → Google Apps Script へ POST
5. 成功/エラーメッセージ表示

### FormContainer

全フォームページの共通オーケストレーター。`FormContainer` が `useExpirationStatus` を内部で呼び出し、以下の状態を自動的に制御する：

1. **ローディング** - 期限チェック中
2. **接続エラー** - GAS への疎通失敗時
3. **期限切れ** - GAS が `expired: true` を返した場合
4. **フォーム表示** - 有効期間中
5. **送信成功/失敗** - `submissionState` に基づく切り替え

`SubmissionLoader`（全画面オーバーレイ）は送信中のスクロール防止も担う。

### API Integration

- `services/api.ts` - 全ての外部 API コール（`checkExpiration` / `submitForm` / `fetchData`）
- 全 GAS レスポンスは `{ result: "done" | "error", ...data }` の判別共用体
- 開発時は `DevApiToggle` コンポーネント（画面右下）で API モードを切り替え可能
  - `mock-ok` - 成功レスポンスをシミュレート（デフォルト）
  - `mock-err` - エラーレスポンスをシミュレート
  - `real` - 実際の GAS エンドポイントを使用
  - 選択は `localStorage` に保存される
- `FormLayout.astro` は `noindex` メタを付与（外部公開不要なページのため）

## Conventions

### File Naming

- コンポーネント: PascalCase（`.tsx`, `.astro`）
- ユーティリティ/サービス: kebab-case（`.ts`）
- ページ専用ファイル: アンダースコア prefix（`_apply-form.tsx`, `_calc-total.ts`）
- テスト: ページ専用ファイルと同階層に `_name.test.ts`（例: `_calc-total.test.ts`）

### Code Style

- `interface` より `type` を優先
- コメントは「なぜ」を説明、「何を」は不要
- SolidJS `.tsx` コンポーネントはそれぞれ同名の `.module.css` を持つ
- Astro コンポーネント/ページはスコープド `<style>` タグを使用
- デザイントークン（`--color-*`, `--space-*` など）は `src/styles/design-*.css` テーマファイルで定義。各ページのフロントマターで `import "@/styles/design-indigo.css"` のように個別に読み込む（`global.css` は CSS リセットのみ）
- CSS Modules の `composes` でバリアントパターンを実現（biome.json で `css.parser.cssModules: true` 設定済み）
- クラス結合には `src/utils/cn.ts` の `cn()` ユーティリティを使用
- インラインスタイル禁止（動的な CSS 変数値の適用を除く）
- コンポーネントは 100 行以内を目安に分割
- パスエイリアス `@/` を使用（例: `@/components/forms`, `@/hooks`）

### SolidJS Patterns

- `createSignal` - 単純なリアクティブ値
- `createStore` - 複雑なオブジェクト
- `createResource` - 非同期データ
- `Show` - 条件付きレンダリング
- `For` - リストレンダリング

## Environment Variables

```bash
PUBLIC_RECAPTCHA_SITE_KEY     # reCAPTCHA v3 サイトキー
PUBLIC_POST_TO_SHEET_URL      # フォーム送信エンドポイント
PUBLIC_FETCH_FROM_SHEET_URL   # データ取得エンドポイント
PUBLIC_CREATE_SHEET_URL       # シート作成エンドポイント
```

## Design Decisions

- **ページ独立デザイン** - 各イベントページのデザインは完全に独立したサイトとして扱う。`Header.astro` / `Main.astro` / `Footer.astro` などの共有レイアウトコンポーネントは持たない。`Input` / `SubmitButton` などの UI コンポーネントも共有せず、各ページディレクトリに `_` prefix のページ専用ファイルとして配置する。詳細は `docs/design-policy.md` を参照
- **過去ページ残置** - 過去イベントのページは削除せず残す。参加者がURLをブックマークしている可能性がある。期限切れページは `_apply-form.tsx` 等の form パーツを取り除き `ExpiredMessage` コンポーネントのみ使用する
- **indexページなし（本番）** - 本番のトップページは存在せず `/` は 404。各フォームURLを直接共有する運用。dev時のみ `astro.config.mjs` の `devPagesIndex` integration が `/` にページ一覧を inject する（`src/dev/index.astro`）。エントリは `src/pages/` の外にあるため本番ビルドには含まれない
- **GAS type mapping** - フォームタイプID（`202509a`, `202509s`）が GAS 側のスプレッドシートに対応
- **単一エンドポイント** - 送信・期限チェック・データ取得を少数の GAS エンドポイントで処理。`type` パラメータで振り分け
- **小規模想定** - 数十人規模の申込を扱う。DB やキューは不要で GAS + Spreadsheet で十分
- **Cloudflare Pages デプロイ** - 静的サイトとして Cloudflare Pages にデプロイ。サーバーサイド処理は GAS に委譲

## New Form Creation

スキルを使うと自動生成できる：

```bash
/create-apply YYYY/MM [イベント名] [開催日]   # 申込フォーム
/create-survey YYYY/MM                        # アンケートフォーム（apply 作成後）
/create-apply-confirm YYYY/MM                 # 参加者確認リスト
```

手動で作成する場合：
1. `/src/pages/YYYY/MM/` にディレクトリ作成
2. `apply.astro` - フロントマターでテーマ CSS（`design-*.css`）と `FormLayout.astro` を import し、`<style>` でページ独自のデザインを定義（他のページのデザインを参考にしない）
3. `_input.tsx` / `_submit-button.tsx` 等の UI コンポーネントをページ専用で作成（共有コンポーネントは使わない）
4. `_apply-form.tsx` + `_apply-form.module.css` - `useForm` フックでフォーム実装
5. `FormContainer` に `type`（フォームタイプID）を渡す（例: `202603a`）
6. reCAPTCHA v3 統合（`FormLayout` の `loadRecaptcha` prop）
