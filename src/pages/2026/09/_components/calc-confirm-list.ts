import { calcTotalFee, FEE_ITEMS, type FeeItemKey } from "./calc-fee";

// Column order must match the GAS spreadsheet columns for form type 202609a.
export type ConfirmListItem = [
  string, // STATUS
  boolean, // LATEST
  string, // CHURCH_NAME
  string, // FULL_NAME
  string, // KANA_NAME
  string, // AGE
  string, // GENDER
  string, // FAITH_STATUS
  string, // AGE_CATEGORY
  string, // DAY1_DINNER
  string, // DAY1_ACCOMMODATION
  string, // DAY2_BREAKFAST
  string, // DAY2_LUNCH
  string, // DAY2_DINNER
  string, // DAY2_ACCOMMODATION
  string, // DAY3_BREAKFAST
  string, // WORKSHOP
  string, // RECREATION
  string, // COMMENTS
];

export const I = {
  STATUS: 0,
  LATEST: 1,
  CHURCH_NAME: 2,
  FULL_NAME: 3,
  KANA_NAME: 4,
  AGE: 5,
  GENDER: 6,
  FAITH_STATUS: 7,
  AGE_CATEGORY: 8,
  DAY1_DINNER: 9,
  DAY1_ACCOMMODATION: 10,
  DAY2_BREAKFAST: 11,
  DAY2_LUNCH: 12,
  DAY2_DINNER: 13,
  DAY2_ACCOMMODATION: 14,
  DAY3_BREAKFAST: 15,
  WORKSHOP: 16,
  RECREATION: 17,
  COMMENTS: 18,
} as const;

const STATUS_COMPLETE = "申し込み完了";

const FEE_ITEM_INDEX: Record<FeeItemKey, number> = {
  day1Dinner: I.DAY1_DINNER,
  day1Accommodation: I.DAY1_ACCOMMODATION,
  day2Breakfast: I.DAY2_BREAKFAST,
  day2Lunch: I.DAY2_LUNCH,
  day2Dinner: I.DAY2_DINNER,
  day2Accommodation: I.DAY2_ACCOMMODATION,
  day3Breakfast: I.DAY3_BREAKFAST,
};

export function filterValidParticipants(
  data: ConfirmListItem[],
): ConfirmListItem[] {
  return data.filter(
    (item) => item[I.STATUS] === STATUS_COMPLETE && item[I.LATEST],
  );
}

export function calcItemFee(item: ConfirmListItem): number {
  const formData: Record<string, string> = {
    ageCategory: item[I.AGE_CATEGORY],
  };
  for (const key of Object.keys(FEE_ITEM_INDEX) as FeeItemKey[]) {
    formData[key] = item[FEE_ITEM_INDEX[key]] as string;
  }
  return calcTotalFee(formData);
}

export function formatParticipationDays(item: ConfirmListItem): string {
  const labels = FEE_ITEMS.filter(
    (feeItem) => item[FEE_ITEM_INDEX[feeItem.key]] === "true",
  ).map((feeItem) => feeItem.label);

  return labels.length > 0 ? labels.join("、") : "-";
}
