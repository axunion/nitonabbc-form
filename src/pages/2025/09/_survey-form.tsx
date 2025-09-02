import { FormContainer, FormField, RecaptchaNotice } from "@/components/forms/";
import { Checkbox, RadioGroup, SubmitButton, TextArea } from "@/components/ui/";
import { useForm } from "@/hooks/useForm";

const APPLICATION_DEADLINE =
	new Date("2025-08-22T00:00:00+09:00").getTime() / 1000;

const initialFormData = {
	type: "202509s",
	accessibility: "",
	mealQuality: "",
	facilityQuality: "",
	schedulePace: "",
	feedback: "",
	comments: "",
	marriage: "",
	dedication: "",
	work: "",
	worship: "",
	service: "",
	praise: "",
	history: "",
};

export default function SurveyForm() {
	const {
		formData,
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
			expiredMessage="このアンケートは準備中です。"
			successTitle="送信が完了しました"
			successMessage="ご協力ありがとうございます。"
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
							{ label: "余裕があった", value: "余裕があったÏ" },
						]}
						required
						{...bindChange("schedulePace")}
					/>
				</FormField>

				<FormField label="興味のある分科会のテーマがあれば教えてください。">
					<div class="space-y-2">
						<Checkbox {...bindCheckbox("dedication", "true")}>献身</Checkbox>
						<Checkbox {...bindCheckbox("marriage", "true")}>結婚</Checkbox>
						<Checkbox {...bindCheckbox("work", "true")}>仕事</Checkbox>
						<Checkbox {...bindCheckbox("worship", "true")}>礼拝</Checkbox>
						<Checkbox {...bindCheckbox("service", "true")}>奉仕</Checkbox>
						<Checkbox {...bindCheckbox("praise", "true")}>賛美</Checkbox>
						<Checkbox {...bindCheckbox("history", "true")}>歴史</Checkbox>
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
