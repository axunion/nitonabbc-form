import { For } from "solid-js";

interface Props {
	name: string;
	options: Array<{ value: string; label: string }>;
	required?: boolean;
	value?: string;
	disabled?: boolean;
	class?: string;
	onChange?: (e: Event & { currentTarget: HTMLSelectElement }) => void;
}

export default function SelectInput(props: Props) {
	return (
		<select
			name={props.name}
			required={props.required}
			value={props.value || ""}
			disabled={props.disabled}
			onChange={props.onChange}
			class={`w-full px-3 py-2 border border-indigo-200 rounded-md bg-white/70 backdrop-blur-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
				props.class || ""
			}`}
			aria-describedby={`${props.name}-description`}
		>
			<For each={props.options}>
				{(option) => <option value={option.value}>{option.label}</option>}
			</For>
		</select>
	);
}
