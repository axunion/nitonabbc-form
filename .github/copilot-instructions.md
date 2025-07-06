# Copilot Instructions for nitonabbc-form

## Project Overview

教会イベントの申込フォームとアンケートフォームを作成するプロジェクトです。Google Apps ScriptとGoogle Spreadsheetで管理されます。

## Technology Stack

- **フレームワーク**: Astro v5.9.3
- **UIライブラリ**: SolidJS v5.1.0
- **スタイリング**: TailwindCSS v4.1.10
- **コード品質**: Biome v1.9.4
- **ランタイム**: Node.js v22.16.0 (Volta)

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

### Directory Structure

```
src/
├── assets/             # 静的ファイル
├── components/
│   ├── forms/          # フォーム関連コンポーネント
│   ├── layout/         # レイアウトコンポーネント
│   └── ui/             # 再利用可能なUIコンポーネント
├── layouts/            # ページレイアウト
├── pages/              # ページファイル
└── styles/             # グローバルスタイル
```

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

## New Form Creation Checklist

### Structure & Components
- [ ] `/YYYY/MM/(apply|survey)`パターンで`.astro`ファイル作成
- [ ] FormLayout.astroと既存コンポーネントを再利用
- [ ] レスポンシブデザインを実装

### Security & Validation
- [ ] reCAPTCHA v3統合を設定
- [ ] クライアント・サーバーサイド検証を追加
- [ ] CORS設定をテスト

### Quality Assurance
- [ ] WCAG 2.1 A/AA準拠を確認
- [ ] プログレッシブエンハンスメントをテスト
- [ ] パフォーマンスを最適化

## References
- [Astro](https://docs.astro.build/) | [SolidJS](https://www.solidjs.com/docs/latest) | [TailwindCSS](https://tailwindcss.com/docs)
- [WCAG ガイドライン](https://www.w3.org/WAI/WCAG21/quickref/) | [Biome](https://biomejs.dev/)
- [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
