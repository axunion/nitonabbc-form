import type { JSX } from "solid-js";
import { cn } from "@/utils/cn";
import styles from "./SubmitButton.module.css";

export type SubmitButtonProps = {
	class?: string;
	type?: "submit" | "button";
	variant?: "primary" | "secondary";
	disabled?: boolean;
	loading?: boolean;
	children?: JSX.Element;
};

export default function SubmitButton(props: SubmitButtonProps) {
	const variantClass =
		props.variant === "secondary" ? styles.secondary : styles.primary;

	return (
		<button
			type={props.type || "submit"}
			disabled={props.disabled || props.loading}
			class={cn(variantClass, props.class)}
			aria-describedby="submit-description"
		>
			{props.children}
		</button>
	);
}
