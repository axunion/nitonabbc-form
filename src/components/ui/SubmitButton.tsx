import type { JSX } from "solid-js";

interface Props {
	type?: "submit" | "button";
	variant?: "primary" | "secondary";
	disabled?: boolean;
	loading?: boolean;
	class?: string;
	children?: JSX.Element;
}

export default function SubmitButton(props: Props) {
	const baseClasses =
		"w-full px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

	const variantClasses = {
		primary:
			"bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-500",
		secondary:
			"bg-white/70 text-indigo-700 hover:bg-white border border-indigo-200",
	};

	return (
		<button
			type={props.type || "submit"}
			disabled={props.disabled || props.loading}
			class={`${baseClasses} ${variantClasses[props.variant || "primary"]} ${
				props.class || ""
			}`}
			aria-describedby="submit-description"
		>
			{props.children}
		</button>
	);
}
