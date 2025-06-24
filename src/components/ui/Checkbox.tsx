import type { JSX } from "solid-js";

interface Props {
	name: string;
	value: string;
	checked?: boolean;
	required?: boolean;
	class?: string;
	children: JSX.Element;
	onChange?: (checked: boolean) => void;
}

export default function Checkbox(props: Props) {
	const {
		name,
		value,
		checked = false,
		required = false,
		class: className = "",
		children,
		onChange,
	} = props;

	const handleChange = (e: Event & { currentTarget: HTMLInputElement }) => {
		if (onChange) {
			onChange(e.currentTarget.checked);
		}
	};

	return (
		<label class={`flex items-center space-x-2 cursor-pointer ${className}`}>
			<input
				type="checkbox"
				name={name}
				value={value}
				checked={checked}
				required={required}
				onChange={handleChange}
				class="w-4 h-4 text-indigo-600 bg-white/70 border-indigo-200 rounded focus:ring-indigo-300 focus:ring-2"
			/>
			<span>{children}</span>
		</label>
	);
}
