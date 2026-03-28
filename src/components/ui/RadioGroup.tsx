import { For } from "solid-js";
import { cn } from "@/utils/cn";
import styles from "./RadioGroup.module.css";

export type RadioGroupProps = {
	class?: string;
	name: string;
	options: Array<{ value: string; label: string }>;
	orientation?: "vertical" | "horizontal";
	required?: boolean;
	value?: string;
	disabled?: boolean;
	onChange?: (e: Event & { currentTarget: HTMLInputElement }) => void;
};

export default function RadioGroup(props: RadioGroupProps) {
	const orientationClass =
		props.orientation === "horizontal" ? styles.horizontal : styles.vertical;

	return (
		<div class={cn(orientationClass, props.class)}>
			<For each={props.options}>
				{(option) => (
					<div>
						<label class={props.disabled ? styles.labelDisabled : styles.label}>
							<input
								type="radio"
								name={props.name}
								value={option.value}
								checked={option.value === props.value}
								required={props.required}
								disabled={props.disabled}
								onChange={props.onChange}
								class={styles.radio}
							/>
							<span class={styles.labelText}>{option.label}</span>
						</label>
					</div>
				)}
			</For>
		</div>
	);
}
