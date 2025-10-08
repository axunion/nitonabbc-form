import type { JSX } from "solid-js";
import Message from "@/components/forms/Message";

export type SuccessMessageProps = {
	children: JSX.Element;
};

export default function SuccessMessage(props: SuccessMessageProps) {
	return (
		<Message>
			<div class="mb-6">
				<div class="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-[bounceIn_0.7s_ease-out_forwards]">
					<svg
						class="w-6 h-6 text-green-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
			</div>

			<div class="space-y-4 text-center">{props.children}</div>
		</Message>
	);
}
