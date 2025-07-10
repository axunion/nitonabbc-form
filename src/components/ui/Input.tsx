import { For } from "solid-js";

export type InputProps = {
	class?: string;
	type?: "text" | "email" | "tel" | "password" | "url" | "search";
	name: string;
	placeholder?: string;
	required?: boolean;
	value?: string;
	disabled?: boolean;
	minlength?: string;
	maxlength?: string;
	pattern?: string;
	title?: string;
	autocompleteOptions?: string[];
	onInput?: (e: InputEvent & { currentTarget: HTMLInputElement }) => void;
};

export default function Input(props: InputProps) {
	const listId = props.autocompleteOptions
		? `${props.name}-autocomplete-list`
		: undefined;

	return (
		<div class="px-2 pb-1 border-b border-indigo-200">
			<input
				type={props.type || "text"}
				name={props.name}
				placeholder={props.placeholder}
				required={props.required}
				value={props.value || ""}
				disabled={props.disabled}
				minlength={props.minlength}
				maxlength={props.maxlength}
				pattern={props.pattern}
				title={props.title}
				list={listId}
				onInput={props.onInput}
				class={`appearance-none w-full borde-0 bg-transparent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
					props.class || ""
				}`}
				aria-describedby={`${props.name}-description`}
			/>

			{props.autocompleteOptions && (
				<datalist id={listId}>
					<For each={props.autocompleteOptions}>
						{(option) => <option value={option} />}
					</For>
				</datalist>
			)}
		</div>
	);
}
