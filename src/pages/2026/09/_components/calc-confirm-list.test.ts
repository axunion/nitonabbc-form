import { describe, expect, it } from "vitest";
import {
  type ConfirmListItem,
  filterValidParticipants,
  formatCheck,
} from "./calc-confirm-list";

function makeItem(status: string, latest: boolean): ConfirmListItem {
  return [
    status,
    latest,
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
}

describe("filterValidParticipants", () => {
  it("STATUS が「申し込み完了」かつ LATEST が true の行だけを残す", () => {
    const data = [
      makeItem("申し込み完了", true),
      makeItem("キャンセル", true),
      makeItem("申し込み完了", false),
    ];

    expect(filterValidParticipants(data)).toEqual([data[0]]);
  });

  it("該当する行がない場合は空配列を返す", () => {
    const data = [
      makeItem("キャンセル", true),
      makeItem("申し込み完了", false),
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
