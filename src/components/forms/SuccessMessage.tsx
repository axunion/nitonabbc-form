import type { JSX } from "solid-js";

export type SuccessMessageProps = {
	children: JSX.Element;
	class?: string;
};

export default function SuccessMessage(props: SuccessMessageProps) {
	return (
		<div
			class={`max-w-lg mx-auto ${props.class || ""}`}
			role="alert"
			aria-live="polite"
		>
			<div class="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center shadow-md opacity-0 translate-y-4 scale-95 animate-[fadeInUp_0.5s_ease-out_forwards]">
				<div class="mb-6">
					<div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-[bounceIn_0.7s_0.2s_ease-out_forwards]">
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
				<div class="space-y-4 opacity-0 translate-y-2 animate-[fadeInUp_0.6s_0.3s_ease-out_forwards]">
					{props.children}
				</div>
			</div>
		</div>
	);
}
