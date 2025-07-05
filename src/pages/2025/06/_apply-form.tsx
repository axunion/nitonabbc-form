import {
	FormContainer,
	FormField,
	FormSection,
	RecaptchaNotice,
} from "@/components/forms/";
import {
	Checkbox,
	Input,
	RadioGroup,
	Select,
	SubmitButton,
	TextArea,
} from "@/components/ui/";
import { useForm } from "@/hooks/useForm";

const APPLICATION_DEADLINE = new Date("2025-07-28T12:00:00+09:00").getTime();

const initialFormData = {
	fullName: "",
	email: "",
	phone: "",
	occupation: "",
	experience: "",
	webDevelopment: "",
	dataScience: "",
	mobileDevelopment: "",
	comments: "",
};

export default function ApplyForm() {
	const {
		bindInput,
		bindChange,
		bindCheckbox,
		isSubmitting,
		submissionState,
		handleSubmit,
	} = useForm(initialFormData);

	return (
		<FormContainer
			isSubmitting={isSubmitting}
			submissionState={submissionState}
			deadline={APPLICATION_DEADLINE}
		>
			<form onSubmit={handleSubmit} class="space-y-4">
				<FormSection>
					<h2 class="text-lg font-semibold mb-6">基本情報</h2>

					<FormField label="氏名" required>
						<Input
							type="text"
							placeholder="山田 太郎"
							minlength="2"
							required
							{...bindInput("fullName")}
						/>
					</FormField>

					<FormField label="メールアドレス" required>
						<Input
							type="email"
							placeholder="example@example.com"
							required
							{...bindInput("email")}
						/>
					</FormField>

					<FormField label="電話番号">
						<Input
							type="tel"
							placeholder="090-1234-5678"
							pattern="[\d\-\+\(\)\s]+"
							title="正しい電話番号を入力してください"
							{...bindInput("phone")}
						/>
					</FormField>

					<FormField label="職業" required>
						<Select
							options={[
								{ value: "", label: "選択してください" },
								{ value: "student", label: "学生" },
								{ value: "engineer", label: "エンジニア" },
								{ value: "other", label: "その他" },
							]}
							required
							{...bindChange("occupation")}
						/>
					</FormField>
				</FormSection>

				<FormSection>
					<h2 class="text-lg font-semibold mb-6">スキル・経験</h2>

					<FormField label="プログラミング経験" required>
						<RadioGroup
							options={[
								{ value: "beginner", label: "初心者" },
								{ value: "intermediate", label: "中級者" },
								{ value: "advanced", label: "上級者" },
							]}
							orientation="horizontal"
							required
							{...bindChange("experience")}
						/>
					</FormField>

					<FormField label="興味のある分野">
						<p class="text-sm text-gray-500 mb-2">複数選択可</p>
						<div class="space-y-2">
							<Checkbox {...bindCheckbox("webDevelopment", "true")}>
								Web開発
							</Checkbox>
							<Checkbox {...bindCheckbox("dataScience", "true")}>
								データサイエンス
							</Checkbox>
							<Checkbox {...bindCheckbox("mobileDevelopment", "true")}>
								モバイル開発
							</Checkbox>
						</div>
					</FormField>
				</FormSection>

				<FormSection>
					<h3 class="text-lg font-semibold mb-6">ご意見・ご要望</h3>
					<FormField label="ご意見・ご要望">
						<TextArea
							placeholder="ご自由にお書きください"
							{...bindInput("comments")}
						/>
					</FormField>
				</FormSection>

				<RecaptchaNotice />

				<SubmitButton loading={isSubmitting()}>送信する</SubmitButton>
			</form>
		</FormContainer>
	);
}
