export type LoadingSpinnerProps = {
	size?: "sm" | "md" | "lg";
	class?: string;
};

export default function LoadingSpinner(props: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "w-6 h-6 border-2",
		md: "w-12 h-12 border-3",
		lg: "w-16 h-16 border-4",
	};

	return (
		<div
			class={`${
				sizeClasses[props.size || "sm"]
			} border-indigo-200 border-t-indigo-600 rounded-full animate-spin ${
				props.class || ""
			}`}
			aria-hidden="true"
		/>
	);
}
