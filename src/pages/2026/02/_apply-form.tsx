import { FormContainer, FormField, RecaptchaNotice } from "@/components/forms/";
import { Input, RadioGroup, Select, SubmitButton, TextArea } from "@/components/ui/";
import { churchNames } from "@/config/keiyo";
import { useForm } from "@/hooks/useForm";

const initialFormData = {
	type: "202602a",
	churchName: "",
	fullName: "",
	kanaName: "",
	age: "",
	gender: "男性",
	faithStatus: "信者",
	comments: "",
};

export default function ApplyForm() {
	const {
		bindInput,
		bindChange,
		isSubmitting,
		submissionState,
		errorMessage,
		handleSubmit,
	} = useForm(initialFormData);

	return (
		<FormContainer
			isSubmitting={isSubmitting}
			submissionState={submissionState}
			type={initialFormData.type}
			expiredMessage="この申し込みは終了しています。"
			successTitle="申し込みが完了しました"
			successMessage="ご参加ありがとうございます。"
			errorMessage={errorMessage}
		>
			<form
				onSubmit={handleSubmit}
				class="space-y-2 animate-[fadeIn_0.3s_ease-out]"
			>
				<FormField label="教会名" required>
					<Input
						type="text"
						minlength="1"
						maxlength="32"
						required
						autocompleteOptions={churchNames}
						{...bindInput("churchName")}
					/>
				</FormField>

				<FormField label="氏名" required>
					<Input
						type="text"
						minlength="1"
						maxlength="32"
						required
						{...bindInput("fullName")}
					/>
				</FormField>

				<FormField label="ふりがな" required>
					<Input
						type="text"
						minlength="1"
						maxlength="32"
						required
						{...bindInput("kanaName")}
					/>
				</FormField>

				<FormField label="年齢" required>
					<Select
						options={[
							{ value: "", label: "選択してください", disabled: true },
							{ value: "10代", label: "10代" },
							{ value: "20代", label: "20代" },
							{ value: "30代", label: "30代" },
							{ value: "40代", label: "40代" },
							{ value: "50代", label: "50代" },
							{ value: "60代以上", label: "60代以上" },
						]}
						required
						{...bindChange("age")}
					/>
				</FormField>

				<FormField label="性別" required>
					<RadioGroup
						options={[
							{ label: "男性", value: "男性" },
							{ label: "女性", value: "女性" },
						]}
						required
						orientation="horizontal"
						{...bindChange("gender")}
					/>
				</FormField>

				<FormField label="立場" required>
					<RadioGroup
						options={[
							{ label: "信者", value: "信者" },
							{ label: "未信者", value: "未信者" },
							{ label: "教役者", value: "教役者" },
						]}
						required
						orientation="horizontal"
						{...bindChange("faithStatus")}
					/>
				</FormField>

				<FormField label="備考">
					<TextArea maxlength="1024" {...bindInput("comments")} />
				</FormField>


				<SubmitButton>申込する</SubmitButton>

				<RecaptchaNotice />
			</form>
		</FormContainer>
	);
}
