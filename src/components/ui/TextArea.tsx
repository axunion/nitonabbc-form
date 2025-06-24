interface Props {
	name: string;
	placeholder?: string;
	required?: boolean;
	value?: string;
	rows?: number;
	class?: string;
	onInput?: (e: InputEvent & { currentTarget: HTMLTextAreaElement }) => void;
}

export default function TextArea(props: Props) {
	const {
		name,
		placeholder,
		required = false,
		value = "",
		rows = 4,
		class: className = "",
		onInput,
	} = props;

	return (
		<textarea
			name={name}
			placeholder={placeholder}
			required={required}
			rows={rows}
			value={value}
			onInput={onInput}
			class={`w-full px-3 py-2 border border-indigo-200 rounded-md bg-white/70 backdrop-blur-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors resize-vertical ${className}`}
			aria-describedby={`${name}-description`}
		/>
	);
}
