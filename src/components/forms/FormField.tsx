import type { JSX } from "solid-js";

export type FormFieldProps = {
	class?: string;
	label: string;
	required?: boolean;
	children: JSX.Element;
};

export default function FormField(props: FormFieldProps) {
	return (
		<div
			class={`p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-sm border border-indigo-200 ${
				props.class || ""
			}`}
		>
			<div class="text-sm">
				{props.label}
				{props.required && (
					<span class="text-red-400 ml-1" aria-label="required">
						*
					</span>
				)}
			</div>

			<div class="mt-8">{props.children}</div>
		</div>
	);
}
