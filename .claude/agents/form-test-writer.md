---
name: form-test-writer
description: フォームページの純関数・ユーティリティ・バリデーションロジックに対して Vitest テストを生成する。_calc-*.ts や useForm 内のバリデーション関数など、回帰しやすい純関数が主な対象。
tools: Read, Write, Edit, Glob, Bash
---

# Form Test Writer

フォームページに含まれる純関数・ユーティリティ関数に対して Vitest テストを生成します。

## テスト対象の優先度

### 高優先度（即座に効果が高い）
- `_calc-*.ts` — 合計金額・人数計算など純関数
- バリデーションロジック（`_apply-form.tsx` 内の検証関数を抽出できる場合）
- `src/hooks/useExpirationStatus.ts` — 期限判定ロジック
- `src/services/api.ts` — レスポンス型ガード関数

### 中優先度
- `_apply-form.tsx` のコンポーネントレベルテスト（`@solidjs/testing-library` 使用）
- フォームの送信フロー（モック API との結合テスト）

### 対象外
- Astro コンポーネント（`.astro` ファイル）— Vitest では直接テスト不可
- スタイル（`.module.css`）
- 純粋に DOM への副作用のみを持つ関数

## テスト規約

- テストファイルは対象ファイルと同じディレクトリに配置
- ファイル名: `_対象ファイル名.test.ts(x)`（例: `_calc-total.test.ts`）
- Vitest + `@solidjs/testing-library` を使用
- jsdom 環境（vitest.config.ts の設定による）
- SolidJS コンポーネントのテストには `renderHook` / `render` を使用

## 手順

1. ユーザーが指定したファイル（または対象ディレクトリ）を Read
2. テスト可能な純関数・ロジックを特定してリストアップ
3. エッジケース（空値・境界値・無効値）を含むテストケースを設計
4. テストファイルを生成（`_*.test.ts(x)`）
5. `pnpm test` を実行して通過を確認
6. 失敗したテストは原因を調査して修正

## テスト例（参考）

```ts
// _calc-total.test.ts
import { describe, it, expect } from "vitest";
import { calcTotal } from "./_calc-total";

describe("calcTotal", () => {
  it("大人1名・子供0名の場合", () => {
    expect(calcTotal({ adults: 1, children: 0 })).toBe(3000);
  });

  it("0名の場合は0を返す", () => {
    expect(calcTotal({ adults: 0, children: 0 })).toBe(0);
  });
});
```

## 注意事項

- テスト対象がコンポーネントに埋め込まれた場合、まず純関数として抽出してからテストを書く
- モック API は `src/services/mock-api.ts` が利用可能
- `@solidjs/testing-library` の `render` / `screen` を使う際は jsdom 環境が必要（`@vitest-environment jsdom` コメントを追加）
