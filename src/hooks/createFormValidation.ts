import { createSignal } from "solid-js";

type ValidationRule = (value: string) => string | null;
type ValidationErrors = Record<string, string>;
type FormData = Record<string, string>;

export function createFormValidation() {
	const [errors, setErrors] = createSignal<ValidationErrors>({});
	const [isValid, setIsValid] = createSignal(true);

	const validationRules: Record<string, ValidationRule> = {
		fullName: (value: string) => {
			if (!value || value.trim().length === 0) {
				return "氏名は必須です";
			}
			if (value.trim().length < 2) {
				return "氏名は2文字以上で入力してください";
			}
			return null;
		},
		email: (value: string) => {
			if (!value || value.trim().length === 0) {
				return "メールアドレスは必須です";
			}
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				return "正しいメールアドレスを入力してください";
			}
			return null;
		},
		phone: (value: string) => {
			if (value && value.trim().length > 0) {
				const phoneRegex = /^[\d\-\+\(\)\s]+$/;
				if (!phoneRegex.test(value)) {
					return "正しい電話番号を入力してください";
				}
			}
			return null;
		},
		occupation: (value: string) => {
			if (!value || value === "") {
				return "職業を選択してください";
			}
			return null;
		},
		experience: (value: string) => {
			if (!value || value === "") {
				return "プログラミング経験を選択してください";
			}
			return null;
		},
	};

	const validateField = (name: string, value: string) => {
		const rule = validationRules[name];
		if (rule) {
			const error = rule(value);
			setErrors((prev) => {
				const newErrors = { ...prev };
				if (error) {
					newErrors[name] = error;
				} else {
					delete newErrors[name];
				}
				return newErrors;
			});
			return error === null;
		}
		return true;
	};

	const validateForm = (formData: FormData) => {
		const newErrors: ValidationErrors = {};
		let valid = true;

		for (const [field, rule] of Object.entries(validationRules)) {
			const value = formData[field] || "";
			const error = rule(value);
			if (error) {
				newErrors[field] = error;
				valid = false;
			}
		}

		setErrors(newErrors);
		setIsValid(valid);
		return valid;
	};

	const clearError = (fieldName: string) => {
		setErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[fieldName];
			return newErrors;
		});
	};

	const clearAllErrors = () => {
		setErrors({});
		setIsValid(true);
	};

	return {
		errors,
		isValid,
		validateField,
		validateForm,
		clearError,
		clearAllErrors,
	};
}
