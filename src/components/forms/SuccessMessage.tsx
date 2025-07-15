import type { JSX } from "solid-js";

export type SuccessMessageProps = {
	children: JSX.Element;
};

export default function SuccessMessage(props: SuccessMessageProps) {
	return (
		<div class="max-w-lg mx-auto" role="alert" aria-live="polite">
			<div class="bg-white/80 rounded-lg p-8 shadow-md animate-[fadeInUp_0.5s_ease-out_forwards]">
				<div class="mb-6">
					<div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-[bounceIn_0.7s_ease-out_forwards]">
						<svg
							class="w-8 h-8 text-green-600"
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
			</div>
		</div>
	);
}
