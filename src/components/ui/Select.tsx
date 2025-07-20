import { For } from "solid-js";

export type SelectProps = {
	class?: string;
	name: string;
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	required?: boolean;
	value?: string;
	disabled?: boolean;
	onChange?: (e: Event & { currentTarget: HTMLSelectElement }) => void;
};

export default function Select(props: SelectProps) {
	return (
		<div class="relative p-1 border-b border-indigo-200">
			<select
				name={props.name}
				required={props.required}
				value={props.value || ""}
				disabled={props.disabled}
				onChange={props.onChange}
				class={`appearance-none w-full border-0 bg-transparent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
					props.class || ""
				}`}
				aria-describedby={`${props.name}-description`}
			>
				<For each={props.options}>
					{(option) => (
						<option value={option.value} disabled={option.disabled}>
							{option.label}
						</option>
					)}
				</For>
			</select>

			<span
				class="pointer-events-none absolute right-1 top-1 text-indigo-400"
				aria-hidden="true"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Dropdown arrow</title>
					<polygon points="6,8 10,13 14,8" fill="currentColor" />
				</svg>
			</span>
		</div>
	);
}
