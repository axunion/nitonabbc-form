# nitonabbc-form

Astro と SolidJS を使用したイベント申込フォームとアンケートフォームを作成するウェブアプリケーションです。

## 特徴

- **モダンな技術スタック**: Astro 7、SolidJS、LightningCSS + CSS Modules を採用
- **Islands Architecture**: 最小限のクライアントサイド JavaScript で最適なパフォーマンスを実現
- **ページ独立デザイン**: 各イベントページは独立したサイトとして扱い、イベントごとに固有のデザインを持つ
- **Google 連携**: Google Apps Script と Google Spreadsheet によるシームレスなデータ管理
- **セキュリティ**: reCAPTCHA v3 によるスパム対策

## はじめに

### 必要な環境

- Node.js 24+
- pnpm 11+

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/nitonabbc-form.git
cd nitonabbc-form

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

### コマンド

```bash
# 開発
pnpm dev          # 開発サーバー起動
pnpm build        # 本番ビルド
pnpm preview      # 本番ビルドのプレビュー

# コード品質
pnpm check        # Biome リント・フォーマット + Astro 型チェック
pnpm fix          # Biome 自動修正

# テスト（Vitest）
pnpm test         # テスト実行
pnpm test:watch   # ウォッチモード
```

### 開発用ページ一覧

開発サーバー (`pnpm dev`) 起動時のみ、ルート `/` で全ページの一覧が表示されます。`src/pages/**/*.astro` を自動収集するため、ページを追加すると自動で反映されます。本番ビルドには含まれません（`src/dev/index.astro` と `astro.config.mjs` の `devPagesIndex` integration を参照）。

## 使い方

### フォームページ

フォームは `/YYYY/MM/(apply|survey)` のパターンで日付とタイプ別に整理されています：

- **申込フォーム**: `/YYYY/MM/apply` - イベント参加申込用
- **アンケートフォーム**: `/YYYY/MM/survey` - イベント後のフィードバック用

### 環境変数の設定

| 変数名 | 説明 |
| --- | --- |
| `PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 のサイトキー（Google reCAPTCHA 管理画面で取得） |
| `PUBLIC_POST_TO_SHEET_URL` | フォーム送信用 GAS エンドポイント URL |
| `PUBLIC_FETCH_FROM_SHEET_URL` | 参加者データ取得用 GAS エンドポイント URL |

#### ローカル開発

プロジェクトルートに `.env` ファイルを作成して上記の変数を設定する（`.gitignore` で除外済み）。

```bash
# .env
PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
PUBLIC_POST_TO_SHEET_URL=your_google_apps_script_url
PUBLIC_FETCH_FROM_SHEET_URL=your_fetch_endpoint
```

#### Cloudflare Pages デプロイ

`.env` ファイルはデプロイ時には使用されない。Cloudflare Pages ダッシュボードの **Settings > Environment variables** に同じキーと値を登録する。

ビルド設定:

| 項目 | 値 |
| --- | --- |
| ビルドコマンド | `pnpm build` |
| 出力ディレクトリ | `dist` |
| Node.js バージョン | ルートの `.node-version` で指定（Cloudflare Pages が自動で読み取る） |
