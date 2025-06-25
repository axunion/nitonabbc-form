import { Show } from "solid-js";

interface Props {
	isVisible: boolean;
}

export default function SubmissionLoader(props: Props) {
	return (
		<Show when={props.isVisible}>
			<div
				class="fixed inset-0 bg-black/5 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ease-in-out"
				aria-live="polite"
				aria-label="Submitting form"
			>
				<div class="relative animate-in fade-in-0 zoom-in-95 duration-300">
					<div class="flex space-x-3">
						<div
							class="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"
							style="animation-delay: 0ms; animation-duration: 0.8s"
						/>
						<div
							class="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"
							style="animation-delay: 200ms; animation-duration: 0.8s"
						/>
						<div
							class="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"
							style="animation-delay: 400ms; animation-duration: 0.8s"
						/>
					</div>
				</div>
			</div>
		</Show>
	);
}
