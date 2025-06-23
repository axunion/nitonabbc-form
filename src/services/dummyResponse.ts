import type { FormData, FormSubmissionResult } from "@/types/form";
import { validateFormData } from "./validation";

export async function createDummyResponse(
	formData: FormData
): Promise<FormSubmissionResult> {
	// 遅延をシミュレート
	await new Promise((resolve) => setTimeout(resolve, 1500));

	// バリデーション実行
	const validationError = validateFormData(formData);
	if (validationError) {
		return validationError;
	}

	// 成功レスポンス
	return {
		result: "done",
		error: "",
	};
}
