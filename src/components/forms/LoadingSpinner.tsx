import { useScrollLock } from "@/hooks/useScrollLock";
import { Show } from "solid-js";
import { Portal } from "solid-js/web";

interface Props {
	isVisible: boolean;
	size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner(props: Props) {
	useScrollLock(props.isVisible);

	const sizeClasses = {
		sm: "w-6 h-6 border-2",
		md: "w-12 h-12 border-3",
		lg: "w-16 h-16 border-4",
	};

	return (
		<Show when={props.isVisible}>
			<Portal>
				<div
					class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] flex items-center justify-center"
					aria-live="polite"
					aria-label="loading"
				>
					<div class="relative opacity-0 scale-75 animate-[fadeInScale_0.3s_ease-out_forwards]">
						<div
							class={`${
								sizeClasses[props.size || "md"]
							} border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}
							aria-hidden="true"
						/>
					</div>
				</div>
			</Portal>
		</Show>
	);
}
