import { describe, expect, it } from "vitest";
import {
  type ConfirmListItem,
  calcItemFee,
  filterValidParticipants,
  formatParticipationDays,
  I,
} from "./calc-confirm-list";

function makeItem(
  overrides: Partial<Record<keyof typeof I, string | boolean>> = {},
): ConfirmListItem {
  const base: ConfirmListItem = [
    "申し込み完了", // STATUS
    true, // LATEST
    "教会", // CHURCH_NAME
    "山田太郎", // FULL_NAME
    "ヤマダタロウ", // KANA_NAME
    "20", // AGE
    "男性", // GENDER
    "信徒", // FAITH_STATUS
    "一般", // AGE_CATEGORY
    "false", // DAY1_DINNER
    "false", // DAY1_ACCOMMODATION
    "false", // DAY2_BREAKFAST
    "false", // DAY2_LUNCH
    "false", // DAY2_DINNER
    "false", // DAY2_ACCOMMODATION
    "false", // DAY3_BREAKFAST
    "", // WORKSHOP
    "", // RECREATION
    "", // COMMENTS
  ];

  const result = [...base] as ConfirmListItem;

  for (const [key, value] of Object.entries(overrides)) {
    // biome-ignore lint/suspicious/noExplicitAny: tuple index assignment via helper
    (result as any)[I[key as keyof typeof I]] = value;
  }

  return result;
}

describe("filterValidParticipants", () => {
  it("STATUS が「申し込み完了」かつ LATEST が true の行だけを残す", () => {
    const data = [
      makeItem({ STATUS: "申し込み完了", LATEST: true }),
      makeItem({ STATUS: "キャンセル", LATEST: true }),
      makeItem({ STATUS: "申し込み完了", LATEST: false }),
    ];

    expect(filterValidParticipants(data)).toEqual([data[0]]);
  });

  it("該当する行がない場合は空配列を返す", () => {
    const data = [
      makeItem({ STATUS: "キャンセル", LATEST: true }),
      makeItem({ STATUS: "申し込み完了", LATEST: false }),
    ];

    expect(filterValidParticipants(data)).toEqual([]);
  });
});

describe("calcItemFee", () => {
  it("calcTotalFee に必要なフィールドをマッピングして委譲する", () => {
    const item = makeItem({
      AGE_CATEGORY: "一般",
      DAY1_DINNER: "true",
      DAY1_ACCOMMODATION: "true",
    });

    expect(calcItemFee(item)).toBe(2000 + 1600 + 4550);
  });

  it("年齢区分によって宿泊費が変わる", () => {
    const item = makeItem({
      AGE_CATEGORY: "青年",
      DAY2_ACCOMMODATION: "true",
    });

    expect(calcItemFee(item)).toBe(2000 + 3400);
  });
});

describe("formatParticipationDays", () => {
  it("チェックした項目がない場合は「-」を返す", () => {
    expect(formatParticipationDays(makeItem())).toBe("-");
  });

  it("一部の項目をチェックした場合は該当ラベルを「、」で連結する", () => {
    const item = makeItem({
      DAY1_DINNER: "true",
      DAY2_LUNCH: "true",
    });

    expect(formatParticipationDays(item)).toBe("1日目夕食、2日目昼食");
  });

  it("すべての項目をチェックした場合は全ラベルを連結する", () => {
    const item = makeItem({
      DAY1_DINNER: "true",
      DAY1_ACCOMMODATION: "true",
      DAY2_BREAKFAST: "true",
      DAY2_LUNCH: "true",
      DAY2_DINNER: "true",
      DAY2_ACCOMMODATION: "true",
      DAY3_BREAKFAST: "true",
    });

    expect(formatParticipationDays(item)).toBe(
      "1日目夕食、1日目宿泊、2日目朝食、2日目昼食、2日目夕食、2日目宿泊、3日目朝食",
    );
  });
});
