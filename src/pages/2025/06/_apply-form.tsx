import FormField from "@/components/forms/FormField.tsx";
import FormSection from "@/components/forms/FormSection.tsx";
import SubmissionLoader from "@/components/forms/SubmissionLoader.tsx";
import Checkbox from "@/components/ui/Checkbox.tsx";
import Input from "@/components/ui/Input.tsx";
import RadioGroup from "@/components/ui/RadioGroup.tsx";
import Select from "@/components/ui/Select.tsx";
import SubmitButton from "@/components/ui/SubmitButton.tsx";
import TextArea from "@/components/ui/TextArea.tsx";
import { useForm } from "@/hooks/useForm";

const initialFormData = {
	fullName: "",
	email: "",
	phone: "",
	occupation: "",
	experience: "",
	interests: [],
	comments: "",
};

export default function ApplyFormComponent() {
	const {
		formData,
		isSubmitting,
		handleInputChange,
		handleCheckboxChange,
		handleSubmit,
	} = useForm(initialFormData);

	return (
		<main class="py-12 md:py-16 px-4 md:px-8">
			<form onSubmit={handleSubmit} class="max-w-lg mx-auto space-y-4">
				<FormSection>
					<h2 class="text-lg font-semibold mb-6">基本情報</h2>

					<FormField label="氏名" required>
						<Input
							type="text"
							name="fullName"
							placeholder="山田 太郎"
							value={formData.fullName as string}
							disabled={isSubmitting()}
							onInput={(e) =>
								handleInputChange("fullName", e.currentTarget.value)
							}
							required
							minlength="2"
						/>
					</FormField>

					<FormField label="メールアドレス" required>
						<Input
							type="email"
							name="email"
							placeholder="example@example.com"
							value={formData.email as string}
							disabled={isSubmitting()}
							onInput={(e) => handleInputChange("email", e.currentTarget.value)}
							required
						/>
					</FormField>

					<FormField label="電話番号">
						<Input
							type="tel"
							name="phone"
							placeholder="090-1234-5678"
							value={formData.phone as string}
							disabled={isSubmitting()}
							onInput={(e) => handleInputChange("phone", e.currentTarget.value)}
							pattern="[\d\-\+\(\)\s]+"
							title="正しい電話番号を入力してください"
						/>
					</FormField>

					<FormField label="職業" required>
						<Select
							name="occupation"
							options={[
								{ value: "", label: "選択してください" },
								{ value: "student", label: "学生" },
								{ value: "engineer", label: "エンジニア" },
								{ value: "other", label: "その他" },
							]}
							value={formData.occupation as string}
							disabled={isSubmitting()}
							onChange={(e) =>
								handleInputChange("occupation", e.currentTarget.value)
							}
							required
						/>
					</FormField>
				</FormSection>

				<FormSection>
					<h2 class="text-lg font-semibold mb-6">スキル・経験</h2>

					<FormField label="プログラミング経験" required>
						<RadioGroup
							name="experience"
							options={[
								{ value: "beginner", label: "初心者" },
								{ value: "intermediate", label: "中級者" },
								{ value: "advanced", label: "上級者" },
							]}
							value={formData.experience as string}
							disabled={isSubmitting()}
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
								disabled={isSubmitting()}
								onChange={(checked) =>
									handleCheckboxChange("interests", "web", checked)
								}
							>
								Web開発
							</Checkbox>
							<Checkbox
								name="interests"
								value="mobile"
								checked={(formData.interests as string[]).includes("mobile")}
								disabled={isSubmitting()}
								onChange={(checked) =>
									handleCheckboxChange("interests", "mobile", checked)
								}
							>
								モバイルアプリ
							</Checkbox>
							<Checkbox
								name="interests"
								value="ai"
								checked={(formData.interests as string[]).includes("ai")}
								disabled={isSubmitting()}
								onChange={(checked) =>
									handleCheckboxChange("interests", "ai", checked)
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
							disabled={isSubmitting()}
							onInput={(e) =>
								handleInputChange("comments", e.currentTarget.value)
							}
						/>
					</FormField>
				</FormSection>

				<SubmitButton loading={isSubmitting()}>送信する</SubmitButton>
			</form>

			<SubmissionLoader isVisible={isSubmitting()} />
		</main>
	);
}
