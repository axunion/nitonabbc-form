import type { JSX } from "solid-js";

export type ErrorMessageProps = {
	children: JSX.Element;
};

export default function ErrorMessage(props: ErrorMessageProps) {
	return (
		<div class="max-w-lg mx-auto" role="alert" aria-live="assertive">
			<div class="bg-white/80 rounded-lg p-8 shadow-md animate-[fadeInUp_0.5s_ease-out_forwards]">
				<div class="mb-6">
					<div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-[shakeIn_0.7s_ease-out_forwards]">
						<svg
							class="w-8 h-8 text-red-600"
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
			</div>
		</div>
	);
}
