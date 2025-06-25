interface Props {
	name: string;
	placeholder?: string;
	required?: boolean;
	value?: string;
	rows?: number;
	disabled?: boolean;
	class?: string;
	onInput?: (e: InputEvent & { currentTarget: HTMLTextAreaElement }) => void;
}

export default function TextArea(props: Props) {
	return (
		<textarea
			name={props.name}
			placeholder={props.placeholder}
			required={props.required || false}
			rows={props.rows || 4}
			value={props.value || ""}
			disabled={props.disabled || false}
			onInput={props.onInput}
			class={`w-full px-3 py-2 border border-indigo-200 rounded-md bg-white/70 backdrop-blur-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors resize-vertical disabled:opacity-50 disabled:cursor-not-allowed ${
				props.class || ""
			}`}
			aria-describedby={`${props.name}-description`}
		/>
	);
}
