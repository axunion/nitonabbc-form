import { cn } from "@/utils/cn";
import styles from "./TextArea.module.css";

export type TextAreaProps = {
	class?: string;
	name: string;
	placeholder?: string;
	required?: boolean;
	value?: string;
	rows?: number;
	disabled?: boolean;
	maxlength?: number;
	onInput?: (e: InputEvent & { currentTarget: HTMLTextAreaElement }) => void;
};

export default function TextArea(props: TextAreaProps) {
	return (
		<div class={styles.wrapper}>
			<textarea
				name={props.name}
				placeholder={props.placeholder}
				required={props.required}
				rows={props.rows || 4}
				value={props.value || ""}
				disabled={props.disabled}
				maxlength={props.maxlength}
				onInput={props.onInput}
				class={cn(styles.textarea, props.class)}
				aria-describedby={`${props.name}-description`}
			/>
		</div>
	);
}
