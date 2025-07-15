import type { JSX } from "solid-js";

export type ExpiredMessageProps = {
	children: JSX.Element;
};

export default function ExpiredMessage(props: ExpiredMessageProps) {
	return (
		<div class="max-w-lg mx-auto bg-white/80 border border-indigo-200 rounded-md px-8 py-12 animate-[fadeInUp_0.5s_ease-out_forwards]">
			<div class="flex justify-center mb-4">
				<svg
					class="w-12 h-12 text-orange-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-label="clock"
				>
					<title>clock</title>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>

			<div class="my-4 text-center">{props.children}</div>
		</div>
	);
}
