import { cn } from "@/utils/cn";
import styles from "./LoadingSpinner.module.css";

export type LoadingSpinnerProps = {
	size?: "sm" | "md" | "lg";
	class?: string;
};

export default function LoadingSpinner(props: LoadingSpinnerProps) {
	const sizeClass = {
		sm: styles.sm,
		md: styles.md,
		lg: styles.lg,
	};

	return (
		<div
			class={cn(sizeClass[props.size || "sm"], props.class)}
			aria-hidden="true"
		/>
	);
}
