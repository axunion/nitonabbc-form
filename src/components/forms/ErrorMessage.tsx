import type { JSX } from "solid-js";
import Message from "@/components/forms/Message";

export type ErrorMessageProps = {
	children: JSX.Element;
};

export default function ErrorMessage(props: ErrorMessageProps) {
	return (
		<Message>
			<div class="mb-6">
				<div class="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-[shakeIn_0.7s_ease-out_forwards]">
					<svg
						class="w-6 h-6 text-red-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>
			</div>

			<div class="space-y-4 text-center">{props.children}</div>
		</Message>
	);
}
