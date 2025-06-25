import type { JSX } from "solid-js";

interface Props {
	class?: string;
	children: JSX.Element;
}

export default function FormSection(props: Props) {
	return (
		<div
			class={`bg-white/80 backdrop-blur-sm rounded-lg border border-indigo-200 ${
				props.class || ""
			}`}
		>
			<div class="py-8 md:py-10 px-6 md:px-8 space-y-6">{props.children}</div>
		</div>
	);
}
