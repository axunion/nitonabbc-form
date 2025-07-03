import type { JSX } from "solid-js";

interface Props {
	class?: string;
	label: string;
	required?: boolean;
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

			{props.children}
		</div>
	);
}
