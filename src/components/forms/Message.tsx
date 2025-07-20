import type { JSX } from "solid-js";

export type MessageProps = {
	children: JSX.Element;
};

export default function Message(props: MessageProps) {
	return (
		<div class="max-w-lg mx-auto" role="alert" aria-live="assertive">
			<div class="bg-white/80 rounded-lg p-8 shadow-md animate-[fadeInUp_0.5s_ease-out_forwards]">
				{props.children}
			</div>
		</div>
	);
}
