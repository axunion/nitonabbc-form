export type InputProps = {
	type?: "text" | "email" | "tel" | "password" | "url" | "search";
	name: string;
	placeholder?: string;
	required?: boolean;
	value?: string;
	disabled?: boolean;
	class?: string;
	minlength?: string | number;
	maxlength?: string | number;
	pattern?: string;
	title?: string;
	onInput?: (e: InputEvent & { currentTarget: HTMLInputElement }) => void;
};

export default function Input(props: InputProps) {
	return (
		<input
			type={props.type || "text"}
			name={props.name}
			placeholder={props.placeholder}
			required={props.required}
			value={props.value || ""}
			disabled={props.disabled}
			minlength={props.minlength}
			maxlength={props.maxlength}
			pattern={props.pattern}
			title={props.title}
			onInput={props.onInput}
			class={`w-full px-3 py-2 border border-indigo-200 rounded-md bg-white/70 backdrop-blur-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
				props.class || ""
			}`}
			aria-describedby={`${props.name}-description`}
		/>
	);
}
