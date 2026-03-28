import { For } from "solid-js";
import { cn } from "@/utils/cn";
import styles from "./Input.module.css";

export type InputProps = {
	class?: string;
	type?: "text" | "email" | "tel" | "password" | "url" | "search";
	name: string;
	placeholder?: string;
	required?: boolean;
	value?: string;
	disabled?: boolean;
	minlength?: number;
	maxlength?: number;
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
		<div class={styles.wrapper}>
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
				class={cn(styles.input, props.class)}
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
