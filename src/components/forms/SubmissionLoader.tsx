import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { useScrollLock } from "@/hooks/useScrollLock";

export type SubmissionLoaderProps = {
	isVisible: boolean;
};

export default function SubmissionLoader(props: SubmissionLoaderProps) {
	useScrollLock(() => props.isVisible);

	return (
		<Show when={props.isVisible}>
			<Portal>
				<div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] flex items-center justify-center">
					<div class="relative opacity-0 scale-75 animate-[fadeInScale_0.3s_ease-out_forwards]">
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
			</Portal>
		</Show>
	);
}
