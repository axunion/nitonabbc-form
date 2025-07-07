import type { JSX } from "solid-js";

export type CheckboxProps = {
	class?: string;
	name: string;
	value: string;
	checked?: boolean;
	required?: boolean;
	disabled?: boolean;
	children: JSX.Element;
	onChange?: (checked: boolean) => void;
};

export default function Checkbox(props: CheckboxProps) {
	const handleChange = (e: Event & { currentTarget: HTMLInputElement }) => {
		if (props.onChange) {
			props.onChange(e.currentTarget.checked);
		}
	};

	return (
		<div>
			<label
				class={`inline-flex items-center ${
					props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
				} ${props.class || ""}`}
			>
				<input
					type="checkbox"
					name={props.name}
					value={props.value}
					checked={props.checked}
					required={props.required}
					disabled={props.disabled}
					onChange={handleChange}
					class="w-4 h-4 border-indigo-200 rounded focus:ring-indigo-300 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
				/>
				<span class="px-2">{props.children}</span>
			</label>
		</div>
	);
}
