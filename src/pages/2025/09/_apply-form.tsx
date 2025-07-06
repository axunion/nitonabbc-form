import { FormContainer, FormField, RecaptchaNotice } from "@/components/forms/";
import {
	Checkbox,
	Input,
	RadioGroup,
	Select,
	SubmitButton,
	TextArea,
} from "@/components/ui/";
import { useForm } from "@/hooks/useForm";

const APPLICATION_DEADLINE = new Date("2025-08-04T00:00:00+09:00").getTime();

const initialFormData = {
	churchName: "",
	fullName: "",
	kanaName: "",
	age: "",
	address: "",
	gender: "",
	participantType: "",
	faithStatus: "",
	day1Dinner: "",
	day1Accommodation: "",
	day2Breakfast: "",
	day2Lunch: "",
	workshop1: "",
	workshop2: "",
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
			<form onSubmit={handleSubmit} class="space-y-2">
				<FormField label="教会名" required>
					<Input
						type="text"
						minlength="1"
						maxlength="32"
						required
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
					<Input
						type="text"
						minlength="1"
						maxlength="2"
						required
						{...bindInput("age")}
					/>
				</FormField>

				<FormField label="住所" required>
					<Input
						type="text"
						minlength="1"
						maxlength="128"
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

				<FormField label="参加希望">
					<Checkbox {...bindCheckbox("day1Dinner", "true")}>1日目夕食</Checkbox>

					<Checkbox {...bindCheckbox("day1Accommodation", "true")}>
						1日目宿泊
					</Checkbox>

					<Checkbox {...bindCheckbox("day2Breakfast", "true")}>
						2日目朝食
					</Checkbox>

					<Checkbox {...bindCheckbox("day2Lunch", "true")}>2日目昼食</Checkbox>
				</FormField>

				<FormField label="分科会第1希望" required>
					<Select
						options={[
							{ label: "A: 賛美", value: "a" },
							{ label: "B: 祈り", value: "b" },
							{ label: "C: 伝道", value: "c" },
						]}
						{...bindChange("workshop1")}
						required
					/>
				</FormField>

				<FormField label="分科会第2希望" required>
					<Select
						options={[
							{ label: "A: 賛美", value: "a" },
							{ label: "B: 祈り", value: "b" },
							{ label: "C: 伝道", value: "c" },
						]}
						{...bindChange("workshop2")}
						required
					/>
				</FormField>

				<FormField label="備考">
					<TextArea {...bindInput("comments")} rows={4} />
				</FormField>

				<RecaptchaNotice />

				<SubmitButton>申込する</SubmitButton>
			</form>
		</FormContainer>
	);
}
