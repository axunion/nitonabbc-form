import { Show } from "solid-js";

interface Props {
	isVisible: boolean;
	size?: "sm" | "md" | "lg";
	label?: string;
}

export default function LoadingSpinner(props: Props) {
	const sizeClasses = {
		sm: "w-6 h-6 border-2",
		md: "w-12 h-12 border-3",
		lg: "w-16 h-16 border-4",
	};

	return (
		<Show when={props.isVisible}>
			<div
				class="fixed inset-0 bg-black/3 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ease-in-out"
				aria-live="polite"
				aria-label={props.label || "Loading"}
			>
				<div class="relative animate-in fade-in-0 zoom-in-95 duration-300">
					<div
						class={`${
							sizeClasses[props.size || "md"]
						} border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}
					/>
				</div>
			</div>
		</Show>
	);
}
