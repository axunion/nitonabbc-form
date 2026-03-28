import type { JSX } from "solid-js";
import { cn } from "@/utils/cn";
import styles from "./FormField.module.css";

export type FormFieldProps = {
	class?: string;
	label?: string;
	required?: boolean;
	children: JSX.Element;
};

export default function FormField(props: FormFieldProps) {
	return (
		<div class={cn(styles.field, props.class)}>
			{props.label && (
				<div class={styles.label}>
					{props.label}
					{props.required && <span class={styles.required}>*</span>}
				</div>
			)}

			{props.children}
		</div>
	);
}
