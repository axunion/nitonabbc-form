export type FeeItemKey =
  | "day1Dinner"
  | "day1Accommodation"
  | "day2Breakfast"
  | "day2Lunch"
  | "day2Dinner"
  | "day2Accommodation"
  | "day3Breakfast";

type FeePrice = number | { general: number; youth: number };

export const PARTICIPATION_FEE = 2000;
const YOUTH_LABEL = "青年";
const ACCOMMODATION_FEE = { general: 4550, youth: 3400 };

export const FEE_ITEMS: { key: FeeItemKey; label: string; price: FeePrice }[] =
  [
    { key: "day1Dinner", label: "1日目夕食", price: 1600 },
    { key: "day1Accommodation", label: "1日目宿泊", price: ACCOMMODATION_FEE },
    { key: "day2Breakfast", label: "2日目朝食", price: 900 },
    { key: "day2Lunch", label: "2日目昼食", price: 1500 },
    { key: "day2Dinner", label: "2日目夕食", price: 1600 },
    { key: "day2Accommodation", label: "2日目宿泊", price: ACCOMMODATION_FEE },
    { key: "day3Breakfast", label: "3日目朝食", price: 900 },
  ];

export function resolveFeePrice(price: FeePrice, ageCategory: string): number {
  if (typeof price === "number") return price;
  return ageCategory === YOUTH_LABEL ? price.youth : price.general;
}

export function calcTotalFee(formData: Record<string, string>): number {
  const ageCategory = formData.ageCategory;
  const itemsTotal = FEE_ITEMS.reduce((sum, item) => {
    return formData[item.key] === "true"
      ? sum + resolveFeePrice(item.price, ageCategory)
      : sum;
  }, 0);

  return PARTICIPATION_FEE + itemsTotal;
}
