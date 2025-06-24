import { For } from "solid-js";

interface Props {
	name: string;
	options: Array<{ value: string; label: string }>;
	required?: boolean;
	value?: string;
	class?: string;
	onChange?: (e: Event & { currentTarget: HTMLInputElement }) => void;
}

export default function RadioGroup(props: Props) {
	const {
		name,
		options,
		required = false,
		value = "",
		class: className = "",
		onChange,
	} = props;

	return (
		<div class={`space-y-2 ${className}`}>
			<For each={options}>
				{(option) => (
					<label class="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name={name}
							value={option.value}
							checked={option.value === value}
							required={required}
							onChange={onChange}
							class="w-4 h-4 text-indigo-600 bg-white/70 border-indigo-200 focus:ring-indigo-300 focus:ring-2"
						/>
						<span>{option.label}</span>
					</label>
				)}
			</For>
		</div>
	);
}
