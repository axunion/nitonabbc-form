import type { JSX } from "solid-js";
import { cn } from "@/utils/cn";
import styles from "./Checkbox.module.css";

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
				class={cn(
					props.disabled ? styles.labelDisabled : styles.label,
					props.class,
				)}
			>
				<input
					type="checkbox"
					name={props.name}
					value={props.value}
					checked={props.checked}
					required={props.required}
					disabled={props.disabled}
					onChange={handleChange}
					class={styles.checkbox}
				/>
				<span class={styles.labelText}>{props.children}</span>
			</label>
		</div>
	);
}
