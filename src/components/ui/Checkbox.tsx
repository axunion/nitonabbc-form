import type { JSX } from "solid-js";

interface Props {
	name: string;
	value: string;
	checked?: boolean;
	required?: boolean;
	disabled?: boolean;
	class?: string;
	children: JSX.Element;
	onChange?: (checked: boolean) => void;
}

export default function Checkbox(props: Props) {
	const handleChange = (e: Event & { currentTarget: HTMLInputElement }) => {
		if (props.onChange) {
			props.onChange(e.currentTarget.checked);
		}
	};

	return (
		<label
			class={`flex items-center space-x-2 ${
				props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
			} ${props.class || ""}`}
		>
			<input
				type="checkbox"
				name={props.name}
				value={props.value}
				checked={props.checked || false}
				required={props.required || false}
				disabled={props.disabled || false}
				onChange={handleChange}
				class="w-4 h-4 text-indigo-600 bg-white/70 border-indigo-200 rounded focus:ring-indigo-300 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
			/>
			<span>{props.children}</span>
		</label>
	);
}
