import { FormContainer, FormField, RecaptchaNotice } from "@/components/forms/";
import { Checkbox, RadioGroup, SubmitButton, TextArea } from "@/components/ui/";
import { useForm } from "@/hooks/useForm";

const initialFormData = {
	type: "202509s",
	accessibility: "",
	mealQuality: "",
	facilityQuality: "",
	schedulePace: "",
	dedication: "",
	marriage: "",
	work: "",
	worship: "",
	service: "",
	praise: "",
	history: "",
	feedback: "",
	additionalComments: "",
};

export default function SurveyForm() {
	const {
		bindInput,
		bindChange,
		bindCheckbox,
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
			expiredMessage="このアンケートは準備中です。"
			successTitle="送信が完了しました"
			successMessage="ご協力ありがとうございます。"
			errorMessage={errorMessage}
		>
			<form
				onSubmit={handleSubmit}
				class="space-y-2 animate-[fadeIn_0.3s_ease-out]"
			>
				<FormField label="施設へのアクセスはいかがでしたか？" required>
					<RadioGroup
						options={[
							{ label: "非常に満足", value: "非常に満足" },
							{ label: "満足", value: "満足" },
							{ label: "普通", value: "普通" },
							{ label: "不満", value: "不満" },
							{ label: "非常に不満", value: "非常に不満" },
						]}
						required
						{...bindChange("accessibility")}
					/>
				</FormField>

				<FormField label="施設のお食事はいかがでしたか？" required>
					<RadioGroup
						options={[
							{ label: "非常に満足", value: "非常に満足" },
							{ label: "満足", value: "満足" },
							{ label: "普通", value: "普通" },
							{ label: "不満", value: "不満" },
							{ label: "非常に不満", value: "非常に不満" },
						]}
						required
						{...bindChange("mealQuality")}
					/>
				</FormField>

				<FormField label="施設の設備・環境はいかがでしたか？" required>
					<RadioGroup
						options={[
							{ label: "非常に満足", value: "非常に満足" },
							{ label: "満足", value: "満足" },
							{ label: "普通", value: "普通" },
							{ label: "不満", value: "不満" },
							{ label: "非常に不満", value: "非常に不満" },
						]}
						required
						{...bindChange("facilityQuality")}
					/>
				</FormField>

				<FormField label="全体のスケジュールのペースは適切でしたか？" required>
					<RadioGroup
						options={[
							{ label: "忙しかった", value: "忙しかった" },
							{ label: "ちょうどよかった", value: "ちょうどよかった" },
							{ label: "余裕があった", value: "余裕があった" },
						]}
						required
						{...bindChange("schedulePace")}
					/>
				</FormField>

				<FormField label="興味のある分科会のテーマがあれば教えてください。">
					<div class="space-y-2">
						<Checkbox {...bindCheckbox("dedication", "献身")}>献身</Checkbox>
						<Checkbox {...bindCheckbox("marriage", "結婚")}>結婚</Checkbox>
						<Checkbox {...bindCheckbox("work", "仕事")}>仕事</Checkbox>
						<Checkbox {...bindCheckbox("worship", "礼拝")}>礼拝</Checkbox>
						<Checkbox {...bindCheckbox("service", "奉仕")}>奉仕</Checkbox>
						<Checkbox {...bindCheckbox("praise", "賛美")}>賛美</Checkbox>
						<Checkbox {...bindCheckbox("history", "歴史")}>歴史</Checkbox>
					</div>
				</FormField>

				<FormField label="改善してほしい点やご要望がありましたらご記入ください。">
					<TextArea maxlength="1024" {...bindInput("feedback")} />
				</FormField>

				<FormField label="その他のご意見や感想がありましたらご記入ください。">
					<TextArea maxlength="1024" {...bindInput("additionalComments")} />
				</FormField>

				<RecaptchaNotice />

				<SubmitButton>送信する</SubmitButton>
			</form>
		</FormContainer>
	);
}
