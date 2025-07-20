import Message from "@/components/forms/Message";
import type { JSX } from "solid-js";

export type ExpiredMessageProps = {
	children: JSX.Element;
};

export default function ExpiredMessage(props: ExpiredMessageProps) {
	return (
		<Message>
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
		</Message>
	);
}
