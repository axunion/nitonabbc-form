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
import { createEffect, createSignal } from "solid-js";

const APPLICATION_DEADLINE = new Date("2025-08-04T00:00:00+09:00").getTime();

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

const FEE_MAP = {
	day1Dinner: 1100,
	day1Accommodation: 5200,
	day2Breakfast: 800,
	day2Lunch: 900,
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

const calcTotal = (formData: Record<string, string>) => {
	return (
		(formData.participantType === "一般" ? 1500 : 500) +
		(formData.day1Dinner === "true" ? FEE_MAP.day1Dinner : 0) +
		(formData.day1Accommodation === "true" ? FEE_MAP.day1Accommodation : 0) +
		(formData.day2Breakfast === "true" ? FEE_MAP.day2Breakfast : 0) +
		(formData.day2Lunch === "true" ? FEE_MAP.day2Lunch : 0)
	);
};

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
			deadline={APPLICATION_DEADLINE}
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
						pattern="^[\u3040-\u309F]+$"
						title="ひらがなで入力してください"
						required
						{...bindInput("kanaName")}
					/>
				</FormField>

				<FormField label="年齢" required>
					<Input
						type="text"
						minlength="1"
						maxlength="2"
						pattern="\d{1,2}"
						title="1〜2桁の数字を入力してください"
						required
						{...bindInput("age")}
					/>
				</FormField>

				<FormField label="住所" required>
					<Input
						type="text"
						minlength="1"
						maxlength="256"
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

				<FormField label="分科会第1希望" required>
					<Select
						options={WORKSHOP_LIST}
						name="workshop1"
						value={formData.workshop1}
						onChange={(e) => {
							const value = e.currentTarget.value;
							setFormData({ workshop1: value });

							if (formData.workshop2 === value) {
								setFormData({ workshop2: "" });
							}
						}}
						required
					/>
				</FormField>

				<FormField label="分科会第2希望" required>
					<Select
						options={WORKSHOP_LIST}
						name="workshop2"
						value={formData.workshop2}
						onChange={(e) => {
							const value = e.currentTarget.value;
							setFormData({ workshop2: value });

							if (formData.workshop1 === value) {
								setFormData({ workshop1: "" });
							}
						}}
						required
					/>
				</FormField>

				<FormField label="備考">
					<TextArea maxlength="1024" {...bindInput("comments")} />
				</FormField>

				<RecaptchaNotice />

				<SubmitButton>申込する</SubmitButton>
			</form>
		</FormContainer>
	);
}
