import FormField from "@/components/forms/FormField.tsx";
import FormSection from "@/components/forms/FormSection.tsx";
import Checkbox from "@/components/ui/Checkbox.tsx";
import Input from "@/components/ui/Input.tsx";
import RadioGroup from "@/components/ui/RadioGroup.tsx";
import SelectInput from "@/components/ui/SelectInput.tsx";
import SubmitButton from "@/components/ui/SubmitButton.tsx";
import TextArea from "@/components/ui/TextArea.tsx";
import { createFormValidation } from "@/hooks/createFormValidation";
import { submitForm } from "@/services/formSubmission";
import type { FormData } from "@/types/form";
import { For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

const selectOptions = [
	{ value: "", label: "選択してください" },
	{ value: "student", label: "学生" },
	{ value: "engineer", label: "エンジニア" },
	{ value: "other", label: "その他" },
];

const radioOptions = [
	{ value: "beginner", label: "初心者" },
	{ value: "intermediate", label: "中級者" },
	{ value: "advanced", label: "上級者" },
];

export default function ApplyFormComponent() {
	const [formData, setFormData] = createStore<
		Record<string, string | string[]>
	>({
		fullName: "",
		email: "",
		phone: "",
		occupation: "",
		experience: "",
		interests: [],
		comments: "",
	});

	const [isSubmitting, setIsSubmitting] = createSignal(false);
	const [submitResult, setSubmitResult] = createSignal<string | null>(null);

	const { errors, validateField, validateForm, clearError } =
		createFormValidation();

	const handleInputChange = (name: string, value: string | string[]) => {
		setFormData(name, value);

		if (typeof value === "string") {
			validateField(name, value);
		}
	};

	const handleSingleCheckbox = (
		name: string,
		value: string,
		checked: boolean,
	) => {
		const currentValues = Array.isArray(formData[name])
			? (formData[name] as string[])
			: [];
		const newValues = checked
			? [...currentValues, value]
			: currentValues.filter((v) => v !== value);
		setFormData(name, newValues);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
	};

	return (
		<main class="py-12 md:py-16 px-4 md:px-8">
			<form onSubmit={handleSubmit} class="max-w-lg mx-auto space-y-4">
				<FormSection>
					<h2 class="text-lg font-semibold mb-6">基本情報</h2>

					<FormField label="氏名" required error={errors().fullName}>
						<Input
							type="text"
							name="fullName"
							placeholder="山田 太郎"
							value={formData.fullName as string}
							onInput={(e) =>
								handleInputChange("fullName", e.currentTarget.value)
							}
							required
						/>
					</FormField>

					<FormField label="メールアドレス" required error={errors().email}>
						<Input
							type="email"
							name="email"
							placeholder="example@example.com"
							value={formData.email as string}
							onInput={(e) => handleInputChange("email", e.currentTarget.value)}
							required
						/>
					</FormField>

					<FormField label="電話番号" error={errors().phone}>
						<Input
							type="tel"
							name="phone"
							placeholder="090-1234-5678"
							value={formData.phone as string}
							onInput={(e) => handleInputChange("phone", e.currentTarget.value)}
						/>
					</FormField>

					<FormField label="職業" required error={errors().occupation}>
						<SelectInput
							name="occupation"
							options={selectOptions}
							value={formData.occupation as string}
							onChange={(e) =>
								handleInputChange("occupation", e.currentTarget.value)
							}
							required
						/>
					</FormField>
				</FormSection>

				<FormSection>
					<h2 class="text-lg font-semibold mb-6">スキル・経験</h2>

					<FormField
						label="プログラミング経験"
						required
						error={errors().experience}
					>
						<RadioGroup
							name="experience"
							options={radioOptions}
							value={formData.experience as string}
							onChange={(e) =>
								handleInputChange("experience", e.currentTarget.value)
							}
							required
						/>
					</FormField>

					<FormField label="興味のある分野" description="複数選択可">
						<div class="space-y-2">
							<Checkbox
								name="interests"
								value="web"
								checked={(formData.interests as string[]).includes("web")}
								onChange={(checked) =>
									handleSingleCheckbox("interests", "web", checked)
								}
							>
								Web開発
							</Checkbox>
							<Checkbox
								name="interests"
								value="mobile"
								checked={(formData.interests as string[]).includes("mobile")}
								onChange={(checked) =>
									handleSingleCheckbox("interests", "mobile", checked)
								}
							>
								モバイルアプリ
							</Checkbox>
							<Checkbox
								name="interests"
								value="ai"
								checked={(formData.interests as string[]).includes("ai")}
								onChange={(checked) =>
									handleSingleCheckbox("interests", "ai", checked)
								}
							>
								AI・機械学習
							</Checkbox>
						</div>
					</FormField>
				</FormSection>

				<FormSection>
					<h3 class="text-lg font-semibold mb-6">ご意見・ご要望</h3>
					<FormField label="ご意見・ご要望">
						<TextArea
							name="comments"
							placeholder="ご自由にお書きください"
							value={formData.comments as string}
							onInput={(e) =>
								handleInputChange("comments", e.currentTarget.value)
							}
						/>
					</FormField>
				</FormSection>

				{submitResult() && (
					<div
						class={`p-4 rounded-md ${
							submitResult()?.includes("完了")
								? "bg-green-50 text-green-800"
								: "bg-red-50 text-red-800"
						}`}
					>
						{submitResult()}
					</div>
				)}

				<SubmitButton loading={isSubmitting()}>送信する</SubmitButton>
			</form>
		</main>
	);
}
