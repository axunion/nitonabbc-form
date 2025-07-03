import { For } from "solid-js";

export type CheckboxGroupProps = {
	name: string;
	options: Array<{ value: string; label: string }>;
	value: string[];
	required?: boolean;
	disabled?: boolean;
	class?: string;
	orientation?: "vertical" | "horizontal";
	onChange?: (selected: string[]) => void;
};

export default function CheckboxGroup(props: CheckboxGroupProps) {
	const orientationClass =
		props.orientation === "horizontal"
			? "flex flex-wrap gap-x-2 gap-y-2"
			: "space-y-2";

	const handleChange = (checked: boolean, optionValue: string) => {
		let newValue: string[];
		if (checked) {
			newValue = [...props.value, optionValue];
		} else {
			newValue = props.value.filter((v) => v !== optionValue);
		}
		props.onChange?.(newValue);
	};

	return (
		<div class={`${orientationClass} ${props.class || ""}`}>
			<For each={props.options}>
				{(option) => (
					<div>
						<label
							class={`inline-flex items-center ${
								props.disabled
									? "cursor-not-allowed opacity-50"
									: "cursor-pointer"
							}`}
						>
							<input
								type="checkbox"
								name={props.name}
								value={option.value}
								checked={props.value.includes(option.value)}
								required={props.required && props.value.length === 0}
								disabled={props.disabled || false}
								onChange={(e) =>
									handleChange(e.currentTarget.checked, option.value)
								}
								class="w-4 h-4 text-indigo-600 bg-white/70 border-indigo-200 focus:ring-indigo-300 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
							/>
							<span class="px-2">{option.label}</span>
						</label>
					</div>
				)}
			</For>
		</div>
	);
}
