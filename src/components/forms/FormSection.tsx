import type { JSX } from "solid-js";

interface Props {
	class?: string;
	children: JSX.Element;
}

export default function FormSection(props: Props) {
	const { class: className = "", children } = props;

	return (
		<div
			class={`bg-white/80 backdrop-blur-sm rounded-lg border border-indigo-200 ${className}`}
		>
			<div class="py-8 md:py-10 px-6 md:px-8 space-y-6">{children}</div>
		</div>
	);
}
