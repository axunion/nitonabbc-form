import { describe, expect, it } from "vitest";
import { calcTotal, FEE_MAP } from "./_calc-total";

describe("calcTotal", () => {
	const fullParticipation = {
		participantType: "一般",
		day1Dinner: "true",
		day1Accommodation: "true",
		day2Breakfast: "true",
		day2Lunch: "true",
	};

	it("calculates full participation for general attendee", () => {
		const expected =
			1500 +
			FEE_MAP.day1Dinner +
			FEE_MAP.day1Accommodation +
			FEE_MAP.day2Breakfast +
			FEE_MAP.day2Lunch;
		expect(calcTotal(fullParticipation)).toBe(expected);
	});

	it("calculates full participation for high school student", () => {
		const data = { ...fullParticipation, participantType: "高校生" };
		const expected =
			500 +
			FEE_MAP.day1Dinner +
			FEE_MAP.day1Accommodation +
			FEE_MAP.day2Breakfast +
			FEE_MAP.day2Lunch;
		expect(calcTotal(data)).toBe(expected);
	});

	it("calculates base fee only when all options are unchecked", () => {
		const data = {
			participantType: "一般",
			day1Dinner: "",
			day1Accommodation: "",
			day2Breakfast: "",
			day2Lunch: "",
		};
		expect(calcTotal(data)).toBe(1500);
	});

	it("calculates with partial options selected", () => {
		const data = {
			participantType: "一般",
			day1Dinner: "true",
			day1Accommodation: "",
			day2Breakfast: "",
			day2Lunch: "true",
		};
		expect(calcTotal(data)).toBe(1500 + FEE_MAP.day1Dinner + FEE_MAP.day2Lunch);
	});

	it("calculates high school student with no options", () => {
		const data = {
			participantType: "高校生",
			day1Dinner: "",
			day1Accommodation: "",
			day2Breakfast: "",
			day2Lunch: "",
		};
		expect(calcTotal(data)).toBe(500);
	});
});
