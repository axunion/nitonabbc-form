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
	const {
		label,
		required = false,
		description,
		error,
		class: className = "",
		children,
	} = props;

	return (
		<div class={`space-y-2 ${className}`}>
			<div class="block text-sm font-medium">
				{label}
				{required && (
					<span class="text-red-500 ml-1" aria-label="必須">
						*
					</span>
				)}
			</div>

			{description && <p class="text-sm text-gray-500">{description}</p>}

			<div class="relative">{children}</div>

			{error && (
				<p class="text-sm text-red-600" role="alert" aria-live="polite">
					{error}
				</p>
			)}
		</div>
	);
}
