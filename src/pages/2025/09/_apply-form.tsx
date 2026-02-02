import { createEffect, createSignal } from "solid-js";
import { FormContainer, FormField, RecaptchaNotice } from "@/components/forms/";
import {
	Checkbox,
	Input,
	RadioGroup,
	Select,
	SubmitButton,
	TextArea,
} from "@/components/ui/";
import { churchNames } from "@/config/keiyo";
import { useForm } from "@/hooks/useForm";
import { calcTotal } from "./_calc-total";

const initialFormData = {
	type: "202509a",
	churchName: "",
	fullName: "",
	kanaName: "",
	age: "",
	address: "",
	gender: "男性",
	participantType: "一般",
	faithStatus: "信者",
	day1Dinner: "true",
	day1Accommodation: "true",
	day2Breakfast: "true",
	day2Lunch: "true",
	workshop1: "",
	workshop2: "",
	comments: "",
};

const WORKSHOP_LIST = [
	{
		label: "神様が導かれる結婚への道のり",
		value: "神様が導かれる結婚への道のり",
	},
	{ label: "献身の意味とその歩み", value: "献身の意味とその歩み" },
	{ label: "神様に喜ばれる働き方", value: "神様に喜ばれる働き方" },
	{
		label: "奉仕を通して受ける豊かな祝福",
		value: "奉仕を通して受ける豊かな祝福",
	},
];

export default function ApplyForm() {
	const {
		formData,
		setFormData,
		bindInput,
		bindChange,
		bindCheckbox,
		isSubmitting,
		submissionState,
		handleSubmit,
	} = useForm(initialFormData);

	const [participationType, setParticipationType] = createSignal("full");

	createEffect(() => {
		if (participationType() === "full") {
			setFormData({
				day1Dinner: "true",
				day1Accommodation: "true",
				day2Breakfast: "true",
				day2Lunch: "true",
			});
		}
	});

	return (
		<FormContainer
			isSubmitting={isSubmitting}
			submissionState={submissionState}
			type={initialFormData.type}
			expiredMessage="この申し込みは終了しています。"
			successTitle="申し込みが完了しました"
			successMessage="ご参加ありがとうございます。"
		>
			<form
				onSubmit={handleSubmit}
				class="space-y-2 animate-[fadeIn_0.3s_ease-out]"
			>
				<FormField label="教会名" required>
					<Input
						type="text"
						minlength={1}
						maxlength={32}
						required
						autocompleteOptions={churchNames}
						{...bindInput("churchName")}
					/>
				</FormField>

				<FormField label="氏名" required>
					<Input
						type="text"
						minlength={1}
						maxlength={32}
						required
						{...bindInput("fullName")}
					/>
				</FormField>

				<FormField label="ふりがな" required>
					<Input
						type="text"
						minlength={1}
						maxlength={32}
						required
						{...bindInput("kanaName")}
					/>
				</FormField>

				<FormField label="年齢" required>
					<Input
						type="text"
						minlength={1}
						maxlength={2}
						pattern="\d{1,2}"
						title="1〜2桁の数字を入力してください"
						required
						{...bindInput("age")}
					/>
				</FormField>

				<FormField label="住所" required>
					<Input
						type="text"
						minlength={1}
						maxlength={256}
						required
						{...bindInput("address")}
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

				<FormField label="対象" required>
					<RadioGroup
						options={[
							{ label: "一般", value: "一般" },
							{ label: "高校生", value: "高校生" },
						]}
						required
						orientation="horizontal"
						{...bindChange("participantType")}
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

				<FormField label="参加形式" required>
					<RadioGroup
						options={[
							{ label: "全日参加", value: "full" },
							{ label: "部分参加", value: "partial" },
						]}
						required
						orientation="horizontal"
						name="participationType"
						value={participationType()}
						onChange={(e) => setParticipationType(e.currentTarget.value)}
					/>

					{participationType() === "partial" && (
						<div class="mt-4">
							<div class="px-4 space-y-2">
								<Checkbox {...bindCheckbox("day1Dinner", "true")}>
									1日目 夕食
								</Checkbox>
								<Checkbox {...bindCheckbox("day1Accommodation", "true")}>
									1日目 宿泊
								</Checkbox>
								<Checkbox {...bindCheckbox("day2Breakfast", "true")}>
									2日目 朝食
								</Checkbox>
								<Checkbox {...bindCheckbox("day2Lunch", "true")}>
									2日目 昼食
								</Checkbox>
							</div>

							<div class="mt-2 pt-2 pl-12 border-t border-gray-300">
								&yen; {calcTotal(formData).toLocaleString()} -
							</div>
						</div>
					)}
				</FormField>

				<FormField label="分科会第1希望">
					<Select
						options={WORKSHOP_LIST}
						name="workshop1"
						value={formData.workshop1}
						onChange={(e) => {
							setFormData({ workshop1: e.currentTarget.value });
						}}
					/>
				</FormField>

				{formData.workshop1 && (
					<FormField label="分科会第2希望">
						<Select
							options={WORKSHOP_LIST.map((option) => ({
								...option,
								disabled: option.value === formData.workshop1,
							}))}
							name="workshop2"
							value={formData.workshop2}
							onChange={(e) => {
								setFormData({ workshop2: e.currentTarget.value });
							}}
						/>
					</FormField>
				)}

				<FormField label="備考">
					<TextArea maxlength={1024} {...bindInput("comments")} />
				</FormField>

				<RecaptchaNotice />

				<SubmitButton>申込する</SubmitButton>
			</form>
		</FormContainer>
	);
}
