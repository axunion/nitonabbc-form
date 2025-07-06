import { For } from "solid-js";

export type RadioGroupProps = {
	name: string;
	options: Array<{ value: string; label: string }>;
	orientation?: "vertical" | "horizontal";
	required?: boolean;
	value?: string;
	disabled?: boolean;
	class?: string;
	onChange?: (e: Event & { currentTarget: HTMLInputElement }) => void;
};

export default function RadioGroup(props: RadioGroupProps) {
	const orientationClass =
		props.orientation === "horizontal"
			? "flex flex-wrap gap-x-4 gap-y-2"
			: "space-y-2";

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
								type="radio"
								name={props.name}
								value={option.value}
								checked={option.value === (props.value || "")}
								required={props.required || false}
								disabled={props.disabled || false}
								onChange={props.onChange}
								class="w-4 h-4 border-indigo-200 focus:ring-indigo-300 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
							/>
							<span class="px-2">{option.label}</span>
						</label>
					</div>
				)}
			</For>
		</div>
	);
}
