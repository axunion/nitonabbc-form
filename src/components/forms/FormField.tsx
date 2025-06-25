import type { JSX } from "solid-js";

interface Props {
	label: string;
	required?: boolean;
	description?: string;
	error?: string;
	class?: string;
	children: JSX.Element;
}

export default function FormField(props: Props) {
	return (
		<div class={`space-y-2 ${props.class || ""}`}>
			<div class="block text-sm font-medium">
				{props.label}
				{props.required && (
					<span class="text-red-500 ml-1" aria-label="必須">
						*
					</span>
				)}
			</div>

			{props.description && (
				<p class="text-sm text-gray-500">{props.description}</p>
			)}

			<div class="relative">{props.children}</div>

			{props.error && (
				<p class="text-sm text-red-600" role="alert" aria-live="polite">
					{props.error}
				</p>
			)}
		</div>
	);
}
