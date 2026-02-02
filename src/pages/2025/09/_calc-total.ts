export const FEE_MAP = {
	day1Dinner: 1100,
	day1Accommodation: 5200,
	day2Breakfast: 800,
	day2Lunch: 900,
};

export const calcTotal = (formData: Record<string, string>) => {
	return (
		(formData.participantType === "一般" ? 1500 : 500) +
		(formData.day1Dinner === "true" ? FEE_MAP.day1Dinner : 0) +
		(formData.day1Accommodation === "true" ? FEE_MAP.day1Accommodation : 0) +
		(formData.day2Breakfast === "true" ? FEE_MAP.day2Breakfast : 0) +
		(formData.day2Lunch === "true" ? FEE_MAP.day2Lunch : 0)
	);
};
