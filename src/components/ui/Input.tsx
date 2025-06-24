interface Props {
	type?: "text" | "email" | "tel" | "password" | "url" | "search";
	name: string;
	placeholder?: string;
	required?: boolean;
	value?: string;
	class?: string;
	onInput?: (e: InputEvent & { currentTarget: HTMLInputElement }) => void;
}

export default function Input(props: Props) {
	const {
		type = "text",
		name,
		placeholder,
		required = false,
		value = "",
		class: className = "",
		onInput,
	} = props;

	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			required={required}
			value={value}
			onInput={onInput}
			class={`w-full px-3 py-2 border border-indigo-200 rounded-md bg-white/70 backdrop-blur-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors ${className}`}
			aria-describedby={`${name}-description`}
		/>
	);
}
