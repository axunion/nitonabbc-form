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
	return (
		<FormContainer
			initialValues={initialFormData}
			deadline={APPLICATION_DEADLINE}
		>
			{({ formData, isSubmitting, handleInputChange, handleSubmit }) => (
				<form onSubmit={handleSubmit} class="space-y-4">
					<FormSection>
						<h2 class="text-lg font-semibold mb-6">基本情報</h2>

						<FormField label="氏名" required>
							<Input
								type="text"
								name="fullName"
								placeholder="山田 太郎"
								value={formData.fullName}
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
								value={formData.email}
								disabled={isSubmitting()}
								onInput={(e) =>
									handleInputChange("email", e.currentTarget.value)
								}
								required
							/>
						</FormField>

						<FormField label="電話番号">
							<Input
								type="tel"
								name="phone"
								placeholder="090-1234-5678"
								value={formData.phone}
								disabled={isSubmitting()}
								onInput={(e) =>
									handleInputChange("phone", e.currentTarget.value)
								}
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
								value={formData.occupation}
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
								orientation="horizontal"
								value={formData.experience}
								disabled={isSubmitting()}
								onChange={(e) =>
									handleInputChange("experience", e.currentTarget.value)
								}
								required
							/>
						</FormField>

						<FormField label="興味のある分野">
							<p class="text-sm text-gray-500 mb-2">複数選択可</p>
							<div class="space-y-2">
								<Checkbox
									name="webDevelopment"
									value="Web開発"
									checked={formData.webDevelopment === "Web開発"}
									disabled={isSubmitting()}
									onChange={(checked) =>
										handleInputChange(
											"webDevelopment",
											checked ? "Web開発" : "",
										)
									}
								>
									Web開発
								</Checkbox>
								<Checkbox
									name="dataScience"
									value="データサイエンス"
									checked={formData.dataScience === "データサイエンス"}
									disabled={isSubmitting()}
									onChange={(checked) =>
										handleInputChange(
											"dataScience",
											checked ? "データサイエンス" : "",
										)
									}
								>
									データサイエンス
								</Checkbox>
								<Checkbox
									name="mobileDevelopment"
									value="モバイル開発"
									checked={formData.mobileDevelopment === "モバイル開発"}
									disabled={isSubmitting()}
									onChange={(checked) =>
										handleInputChange(
											"mobileDevelopment",
											checked ? "モバイル開発" : "",
										)
									}
								>
									モバイル開発
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
								value={formData.comments}
								disabled={isSubmitting()}
								onInput={(e) =>
									handleInputChange("comments", e.currentTarget.value)
								}
							/>
						</FormField>
					</FormSection>

					<RecaptchaNotice />

					<SubmitButton loading={isSubmitting()}>送信する</SubmitButton>
				</form>
			)}
		</FormContainer>
	);
}
