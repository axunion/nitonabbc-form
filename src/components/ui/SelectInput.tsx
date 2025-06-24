import { For } from "solid-js";

interface Props {
	name: string;
	options: Array<{ value: string; label: string }>;
	required?: boolean;
	value?: string;
	class?: string;
	onChange?: (e: Event & { currentTarget: HTMLSelectElement }) => void;
}

export default function SelectInput(props: Props) {
	const {
		name,
		options,
		required = false,
		value = "",
		class: className = "",
		onChange,
	} = props;

	return (
		<select
			name={name}
			required={required}
			value={value}
			onChange={onChange}
			class={`w-full px-3 py-2 border border-indigo-200 rounded-md bg-white/70 backdrop-blur-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors ${className}`}
			aria-describedby={`${name}-description`}
		>
			<For each={options}>
				{(option) => <option value={option.value}>{option.label}</option>}
			</For>
		</select>
	);
}
