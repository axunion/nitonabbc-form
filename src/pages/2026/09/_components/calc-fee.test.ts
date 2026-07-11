import { describe, expect, it } from "vitest";
import { calcTotalFee } from "./calc-fee";

describe("calcTotalFee", () => {
  it("チェックした項目が1つもない場合でも、参加費のみ(2000)を返す", () => {
    expect(calcTotalFee({ ageCategory: "一般" })).toBe(2000);
  });

  it("チェックした項目が1つもない場合、ageCategory が未設定でも参加費のみ(2000)を返す", () => {
    expect(calcTotalFee({})).toBe(2000);
  });

  it("宿泊以外の項目を1つチェック(一般)すると、参加費+項目料金になる", () => {
    expect(
      calcTotalFee({
        ageCategory: "一般",
        day1Dinner: "true",
      }),
    ).toBe(2000 + 1600);
  });

  it("宿泊以外の項目を1つチェック(青年)しても料金は変わらない", () => {
    expect(
      calcTotalFee({
        ageCategory: "青年",
        day1Dinner: "true",
      }),
    ).toBe(2000 + 1600);
  });

  it("宿泊(day1Accommodation)を一般でチェックすると 4550 円になる", () => {
    expect(
      calcTotalFee({
        ageCategory: "一般",
        day1Accommodation: "true",
      }),
    ).toBe(2000 + 4550);
  });

  it("宿泊(day1Accommodation)を青年でチェックすると 3400 円になる", () => {
    expect(
      calcTotalFee({
        ageCategory: "青年",
        day1Accommodation: "true",
      }),
    ).toBe(2000 + 3400);
  });

  it("宿泊(day2Accommodation)を一般でチェックすると 4550 円になる", () => {
    expect(
      calcTotalFee({
        ageCategory: "一般",
        day2Accommodation: "true",
      }),
    ).toBe(2000 + 4550);
  });

  it("宿泊(day2Accommodation)を青年でチェックすると 3400 円になる", () => {
    expect(
      calcTotalFee({
        ageCategory: "青年",
        day2Accommodation: "true",
      }),
    ).toBe(2000 + 3400);
  });

  it("すべての項目をチェック(一般)すると合計金額になる", () => {
    expect(
      calcTotalFee({
        ageCategory: "一般",
        day1Dinner: "true",
        day1Accommodation: "true",
        day2Breakfast: "true",
        day2Lunch: "true",
        day2Dinner: "true",
        day2Accommodation: "true",
        day3Breakfast: "true",
      }),
    ).toBe(2000 + 1600 + 4550 + 900 + 1500 + 1600 + 4550 + 900);
  });

  it("すべての項目をチェック(青年)すると合計金額になる", () => {
    expect(
      calcTotalFee({
        ageCategory: "青年",
        day1Dinner: "true",
        day1Accommodation: "true",
        day2Breakfast: "true",
        day2Lunch: "true",
        day2Dinner: "true",
        day2Accommodation: "true",
        day3Breakfast: "true",
      }),
    ).toBe(2000 + 1600 + 3400 + 900 + 1500 + 1600 + 3400 + 900);
  });

  it("一部の項目のみチェックした場合は、その合計になる", () => {
    expect(
      calcTotalFee({
        ageCategory: "青年",
        day2Lunch: "true",
        day2Accommodation: "true",
        day3Breakfast: "true",
      }),
    ).toBe(2000 + 1500 + 3400 + 900);
  });
});
