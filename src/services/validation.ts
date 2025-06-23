import type { FormData, FormSubmissionResult } from "@/types/form";

export function validateFormData(
	formData: FormData
): FormSubmissionResult | null {
	let errorMessage = "";

	// 必須フィールドの検証
	if (!formData.fullName) {
		errorMessage = "氏名は必須です";
	} else if (!formData.email) {
		errorMessage = "メールアドレスは必須です";
	} else if (
		typeof formData.email === "string" &&
		!formData.email.includes("@")
	) {
		errorMessage = "有効なメールアドレスを入力してください";
	}

	// エラーがある場合は結果を返す
	if (errorMessage) {
		return {
			result: "error",
			error: errorMessage,
		};
	}

	return null; // バリデーション成功
}
