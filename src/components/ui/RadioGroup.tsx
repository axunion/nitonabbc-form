import { For } from "solid-js";

interface Props {
	name: string;
	options: Array<{ value: string; label: string }>;
	required?: boolean;
	value?: string;
	disabled?: boolean;
	class?: string;
	onChange?: (e: Event & { currentTarget: HTMLInputElement }) => void;
}

export default function RadioGroup(props: Props) {
	return (
		<div class={`space-y-2 ${props.class || ""}`}>
			<For each={props.options}>
				{(option) => (
					<label
						class={`flex items-center space-x-2 ${
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
							class="w-4 h-4 text-indigo-600 bg-white/70 border-indigo-200 focus:ring-indigo-300 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
						/>
						<span>{option.label}</span>
					</label>
				)}
			</For>
		</div>
	);
}
