# Copilot Instructions for nitonabbc-form

## Project Overview

イベントの申込フォームとアンケートフォームを作成するプロジェクトです。Google Apps ScriptとGoogle Spreadsheetで管理されます。

## Technology Stack

- **フレームワーク**: Astro (Islands Architecture)
- **UIライブラリ**: SolidJS
- **スタイリング**: TailwindCSS
- **コード品質**: Biome
- **パッケージ管理**: npm with Volta

## Development Philosophy

### Astro
- Islands Architectureを活用し、クライアントサイドJavaScriptを最小限に
- デフォルトでJavaScript不要の原則
- 各フォームページは独立したMPAとして構築

### SolidJS
- SignalsとcreateStoreを使用した状態管理
- 細粒度のリアクティビティを活用
- 適切なクライアントディレクティブ（load/idle/visible）を選択

### TailwindCSS
- ユーティリティファーストのアプローチ
- モバイルファーストのレスポンシブデザイン
- カスタムCSSを最小限に

## Component Design

### Design Principles
- 単一責任の原則
- 再利用可能で組み合わせ可能な設計
- 最小限のpropsインターフェース

### Naming Conventions
- コンポーネント: PascalCase（`FormInput.astro`）
- ファイル: kebab-case（`form-validation.ts`）
- `@/`パスエイリアスを使用

## Form Development

### URL Pattern
- 形式: `/YYYY/MM/(apply|survey)`
- apply: イベント申込フォーム
- survey: イベント後アンケート

### Core Requirements
- クライアント・サーバーサイド検証
- Google Apps Script統合とreCAPTCHA v3
- WCAG 2.1 A/AAアクセシビリティ準拠
- プログレッシブエンハンスメント対応

## Code Quality

### TypeScript
- strictモードを使用し、`interface`より`type`を優先
- `as`キャストを最小限に

### Comments Policy
- 変更履歴や明白な内容にコメント不要
- 「なぜ」を重視し、「何を」は避ける

### Best Practices
- 不要なクライアントサイドJavaScript回避
- インラインスタイル禁止（Tailwindを使用）
- 大きなコンポーネント分割（100行超は分割）
- グローバル状態回避

## AI Work Process

### Before Making Changes
1. **要件分析** - ユーザーのリクエストを完全に理解する
2. **計画立案** - タスクを明確なステップに分解する
3. **コンテキスト確認** - 既存のコード構造とパターンをチェック
4. **方針確認** - 実行前にアプローチをユーザーに提示
5. **段階的実行** - 検証しながらステップごとに変更

### Change Management
- 編集前に必ずファイルを読み込む
- 適切なツール（read_file、grep_search、semantic_search）を使用
- 各変更後に検証を実行
- 既存のパターンと慣例に従う
- 可能な場合は機能をテスト

### Large Changes Policy
- 大きな変更は綿密に計画を立ててから実行
- 確実に進めるため、方針を確認しながら順番に進める
- 各ステップで動作確認を行う

## Environment and Configuration

### Development Mode
- 開発モードでは、APIコールがダミーレスポンスを返します
- `import.meta.env.DEV`でモード判定
- 本番環境では環境変数による設定が必要

### Environment Variables
- `PUBLIC_RECAPTCHA_SITE_KEY`: reCAPTCHA v3サイトキー
- `PUBLIC_*_URL`: Google Apps Script関連のエンドポイント

## Project Structure Guidelines

### Page Structure
- フォームページは`/YYYY/MM/(apply|survey)`パターンで配置
- 各ページは`FormLayout.astro`を基本レイアウトとして使用
- フォーム実装は専用TSXコンポーネント（`_*-form.tsx`）として分離

### Component Organization
- `components/forms/`: フォーム関連の共通コンポーネント
- `components/ui/`: 再利用可能なUIコンポーネント
- `components/layout/`: ページレイアウト要素
- `hooks/`: カスタムフック（状態管理、API呼び出し等）
- `services/`: 外部API連携

### State Management Pattern
- フォーム状態は`useForm`フックで管理
- データ取得は`useDataFetch`、期限チェックは`useExpirationStatus`
- SolidJSのSignalsとStoreを適切に使い分ける

## New Form Creation Checklist

### Structure & Components
- [ ] `/YYYY/MM/(apply|survey)`パターンで`.astro`ファイル作成
- [ ] `FormLayout.astro`を使用したレイアウト構築
- [ ] 専用フォームコンポーネント（TSX）の作成
- [ ] 既存UIコンポーネントの再利用
- [ ] レスポンシブデザインの実装

### Functionality & Integration
- [ ] `useForm`フックを使用した状態管理
- [ ] 適切なバリデーション（client/server-side）
- [ ] reCAPTCHA v3統合の設定
- [ ] Google Apps Script APIエンドポイント連携
- [ ] エラーハンドリングとローディング状態

### Quality Assurance
- [ ] WCAG 2.1 A/AA準拠の確認
- [ ] プログレッシブエンハンスメント対応
- [ ] 異なるデバイスでの動作確認
- [ ] パフォーマンスの最適化
