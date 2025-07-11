import type { JSX } from "solid-js";

export type FormFieldProps = {
	class?: string;
	label?: string;
	required?: boolean;
	children: JSX.Element;
};

export default function FormField(props: FormFieldProps) {
	return (
		<div
			class={`p-4 md:p-6 bg-white/80 rounded-sm border border-indigo-200 ${
				props.class || ""
			}`}
		>
			{props.label && (
				<div class="text-sm mb-8">
					{props.label}
					{props.required && (
						<span class="text-red-400 ml-1" aria-label="required">
							*
						</span>
					)}
				</div>
			)}

			{props.children}
		</div>
	);
}
