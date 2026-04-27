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

# コード品質（Biome）
pnpm check            # フォーマット・リント・品質チェック
pnpm check:write      # 上記を自動修正

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
├── pages/YYYY/MM/       # 日付ベースのフォームページ
│   ├── apply.astro      # 申込ページ（Astro）
│   └── _apply-form.tsx  # フォーム実装（SolidJS、_ prefix = ページ専用）
├── components/
│   ├── ui/              # 再利用可能な UI コンポーネント
│   ├── forms/           # フォーム関連コンポーネント
│   └── layout/          # レイアウトコンポーネント（Astro）
├── hooks/               # SolidJS カスタムフック
├── services/            # 外部 API 連携
├── layouts/             # Astro レイアウトテンプレート
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
- デザイントークン（`--color-*`, `--space-*` など）は `src/styles/global.css` の `:root` で定義
- CSS Modules の `composes` でバリアントパターンを実現（biome.json で `css.parser.cssModules: true` 設定済み）
- クラス結合には `src/utils/cn.ts` の `cn()` ユーティリティを使用
- インラインスタイル禁止（動的な CSS 変数値の適用を除く）
- コンポーネントは 100 行以内を目安に分割
- パスエイリアス `@/` を使用（`@/components/ui`）

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

- **過去ページ残置** - 過去イベントのページは削除せず残す。参加者がURLをブックマークしている可能性がある
- **indexページなし** - トップページは不要。各フォームURLを直接共有する運用
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
2. `apply.astro` - `FormLayout.astro` を使用したページ（Astro スコープド `<style>` でスタイリング）
3. `_apply-form.tsx` + `_apply-form.module.css` - `useForm` フックでフォーム実装
4. `FormContainer` に `type`（フォームタイプID）を渡す（例: `202603a`）
5. reCAPTCHA v3 統合（`FormLayout` の `loadRecaptcha` prop）
