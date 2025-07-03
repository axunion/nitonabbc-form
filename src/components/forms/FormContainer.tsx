import ErrorMessage from "@/components/forms/ErrorMessage.tsx";
import ExpiredMessage from "@/components/forms/ExpiredMessage.tsx";
import FormField from "@/components/forms/FormField.tsx";
import FormSection from "@/components/forms/FormSection.tsx";
import LoadingSpinner from "@/components/forms/LoadingSpinner.tsx";
import RecaptchaNotice from "@/components/forms/RecaptchaNotice.tsx";
import SubmissionLoader from "@/components/forms/SubmissionLoader.tsx";
import SuccessMessage from "@/components/forms/SuccessMessage.tsx";
import {
	CheckboxGroup,
	type CheckboxGroupProps,
	Input,
	type InputProps,
	RadioGroup,
	type RadioGroupProps,
	Select,
	type SelectProps,
	TextArea,
	type TextAreaProps,
} from "@/components/ui";
import SubmitButton from "@/components/ui/SubmitButton.tsx";
import { useForm } from "@/hooks/useForm";
import { useTimestamp } from "@/hooks/useTimestamp";
import { For, Show } from "solid-js";

type BaseField = { label: string; name: string; required?: boolean };
type FieldInput = { component: "Input" } & BaseField &
	Omit<
		InputProps,
		"value" | "onInput" | "disabled" | "name" | "required" | "label"
	>;
type FieldSelect = { component: "Select" } & BaseField &
	Omit<
		SelectProps,
		"value" | "onChange" | "disabled" | "name" | "required" | "label"
	>;
type FieldRadio = { component: "RadioGroup" } & BaseField &
	Omit<
		RadioGroupProps,
		"value" | "onChange" | "disabled" | "name" | "required" | "label"
	>;
type FieldTextArea = { component: "TextArea" } & BaseField &
	Omit<
		TextAreaProps,
		"value" | "onInput" | "disabled" | "name" | "required" | "label"
	>;
type FieldCheckboxGroup = { component: "CheckboxGroup" } & BaseField &
	Omit<
		CheckboxGroupProps,
		"value" | "onChange" | "disabled" | "name" | "required" | "class"
	> & {
		class?: string;
	};

export type FormFieldDef =
	| FieldInput
	| FieldSelect
	| FieldRadio
	| FieldTextArea
	| FieldCheckboxGroup;

export type FormSectionDef = {
	title?: string;
	fields: FormFieldDef[];
};

export type FormDef = {
	sections: FormSectionDef[];
	submitButtonText?: string;
};

export type FormContainerProps = {
	form: FormDef;
	initialValues: Record<string, string | string[]>;
	deadline?: number;
	successMessage?: string;
	errorMessage?: string;
};

export default function FormContainer(props: FormContainerProps) {
	const deadline = props.deadline ?? Number.MAX_SAFE_INTEGER;
	const { timestampState } = useTimestamp(deadline);
	const {
		formData,
		isSubmitting,
		submissionState,
		handleInputChange,
		handleCheckboxChange,
		handleSubmit,
	} = useForm(props.initialValues);

	const getValue = (name: string) => {
		const v = formData[name];
		return typeof v === "string" ? v : "";
	};

	const getChecked = (name: string, value: string) =>
		Array.isArray(formData[name])
			? (formData[name] as string[]).includes(value)
			: false;

	const renderField = (field: FormFieldDef) => {
		const name = field.name;
		const baseProps = {
			name,
			required: field.required,
			disabled: isSubmitting(),
		};
		switch (field.component) {
			case "Input": {
				const { component, label, ...rest } = field;
				return (
					<Input
						{...baseProps}
						{...rest}
						value={getValue(name)}
						onInput={(e) => handleInputChange(name, e.currentTarget.value)}
					/>
				);
			}
			case "Select": {
				const { component, label, options, ...rest } = field;
				return (
					<Select
						{...baseProps}
						{...rest}
						options={options}
						value={getValue(name)}
						onChange={(e) => handleInputChange(name, e.currentTarget.value)}
					/>
				);
			}
			case "RadioGroup": {
				const { component, label, options, ...rest } = field;
				return (
					<RadioGroup
						{...baseProps}
						{...rest}
						options={options}
						value={getValue(name)}
						onChange={(e) => handleInputChange(name, e.currentTarget.value)}
					/>
				);
			}
			case "CheckboxGroup": {
				const {
					component,
					label,
					options,
					orientation,
					class: className,
					...rest
				} = field;
				return (
					<CheckboxGroup
						name={name}
						options={options}
						value={
							Array.isArray(formData[name]) ? (formData[name] as string[]) : []
						}
						required={field.required}
						disabled={isSubmitting()}
						orientation={orientation}
						class={className}
						onChange={(selected: string[]) => handleInputChange(name, selected)}
					/>
				);
			}
			case "TextArea": {
				const { component, label, ...rest } = field;
				return (
					<TextArea
						{...baseProps}
						{...rest}
						value={getValue(name)}
						onInput={(e) => handleInputChange(name, e.currentTarget.value)}
					/>
				);
			}
		}
	};

	return (
		<>
			<Show when={timestampState() === "loading"}>
				<div class="min-h-[50vh] flex items-center justify-center">
					<LoadingSpinner />
				</div>
			</Show>

			<Show when={timestampState() === "expired"}>
				<ExpiredMessage />
			</Show>

			<Show when={timestampState() === "error"}>
				<ErrorMessage>
					<h2 class="text-2xl font-bold text-red-800 mb-4">
						接続エラーが発生しました
					</h2>
					<p class="text-red-600 text-sm">
						恐れ入りますが、しばらく時間をおいて再度お試しください。
					</p>
				</ErrorMessage>
			</Show>

			<Show when={timestampState() === "valid"}>
				<Show
					when={
						submissionState() === "idle" || submissionState() === "submitting"
					}
				>
					<form onSubmit={handleSubmit} class="space-y-4" novalidate={false}>
						<For each={props.form.sections}>
							{(section) => (
								<FormSection>
									{section.title && (
										<h2 class="text-lg font-semibold mb-6">{section.title}</h2>
									)}
									<For each={section.fields}>
										{(field) => (
											<FormField label={field.label} required={field.required}>
												{renderField(field)}
											</FormField>
										)}
									</For>
								</FormSection>
							)}
						</For>
						<RecaptchaNotice />
						<SubmitButton loading={isSubmitting()}>
							{props.form.submitButtonText || "送信する"}
						</SubmitButton>
					</form>
				</Show>

				<Show when={submissionState() === "success"}>
					<SuccessMessage>
						<h2 class="text-2xl font-bold text-green-800 mb-4">
							送信が完了しました
						</h2>
						<p class="text-green-700 mb-4">
							{props.successMessage || "ありがとうございました。"}
						</p>
					</SuccessMessage>
				</Show>

				<Show when={submissionState() === "error"}>
					<ErrorMessage>
						<h2 class="text-2xl font-bold text-red-800 mb-4">
							送信に失敗しました
						</h2>
						<p class="text-red-700 mb-4">
							{props.errorMessage || "恐れ入りますが、再度お試しください。"}
						</p>
					</ErrorMessage>
				</Show>
			</Show>

			<SubmissionLoader isVisible={isSubmitting()} />
		</>
	);
}
