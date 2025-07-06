export type TextAreaProps = {
	name: string;
	placeholder?: string;
	required?: boolean;
	value?: string;
	rows?: number;
	disabled?: boolean;
	class?: string;
	onInput?: (e: InputEvent & { currentTarget: HTMLTextAreaElement }) => void;
};

export default function TextArea(props: TextAreaProps) {
	return (
		<div class="p-2 rounded-md border border-indigo-200">
			<textarea
				name={props.name}
				placeholder={props.placeholder}
				required={props.required || false}
				rows={props.rows || 4}
				value={props.value || ""}
				disabled={props.disabled || false}
				onInput={props.onInput}
				class={`appearance-none w-full bg-transparent focus:outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
					props.class || ""
				}`}
				aria-describedby={`${props.name}-description`}
			/>
		</div>
	);
}
