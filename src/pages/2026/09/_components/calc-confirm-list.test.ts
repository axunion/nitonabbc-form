import { describe, expect, it } from "vitest";
import {
  type ConfirmListItem,
  filterValidParticipants,
  formatCheck,
  I,
} from "./calc-confirm-list";

function makeItem(
  overrides: Partial<Record<keyof typeof I, string | number | boolean>> = {},
): ConfirmListItem {
  const base: ConfirmListItem = [
    "申し込み完了", // STATUS
    true, // LATEST
    2000, // FEE
    "山田太郎", // FULL_NAME
    false, // DAY1_DINNER
    false, // DAY1_ACCOMMODATION
    false, // DAY2_BREAKFAST
    false, // DAY2_LUNCH
    false, // DAY2_DINNER
    false, // DAY2_ACCOMMODATION
    false, // DAY3_BREAKFAST
    "", // WORKSHOP
    "", // RECREATION
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

describe("formatCheck", () => {
  it("true の場合はチェックマークを返す", () => {
    expect(formatCheck(true)).toBe("✓");
  });

  it("false の場合は空文字を返す", () => {
    expect(formatCheck(false)).toBe("");
  });
});
