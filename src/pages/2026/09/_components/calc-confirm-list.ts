// Column order must match the GAS spreadsheet columns for form type 202609a.
export type ConfirmListItem = [
  string, // STATUS
  boolean, // LATEST
  number, // FEE
  string, // FULL_NAME
  boolean, // DAY1_DINNER
  boolean, // DAY1_ACCOMMODATION
  boolean, // DAY2_BREAKFAST
  boolean, // DAY2_LUNCH
  boolean, // DAY2_DINNER
  boolean, // DAY2_ACCOMMODATION
  boolean, // DAY3_BREAKFAST
  string, // WORKSHOP
  string, // RECREATION
];

export const I = {
  STATUS: 0,
  LATEST: 1,
  FEE: 2,
  FULL_NAME: 3,
  DAY1_DINNER: 4,
  DAY1_ACCOMMODATION: 5,
  DAY2_BREAKFAST: 6,
  DAY2_LUNCH: 7,
  DAY2_DINNER: 8,
  DAY2_ACCOMMODATION: 9,
  DAY3_BREAKFAST: 10,
  WORKSHOP: 11,
  RECREATION: 12,
} as const;

const STATUS_COMPLETE = "申し込み完了";

export function filterValidParticipants(
  data: ConfirmListItem[],
): ConfirmListItem[] {
  return data.filter(
    (item) => item[I.STATUS] === STATUS_COMPLETE && item[I.LATEST],
  );
}

export function formatCheck(value: boolean): string {
  return value ? "✓" : "";
}
