import { getTimestamp } from "@/services/api";
import { createSignal, onMount } from "solid-js";

export type TimestampState = "loading" | "valid" | "expired" | "error";

export function useTimestamp(deadlineUnixtime: number) {
	const [timestampState, setTimestampState] =
		createSignal<TimestampState>("loading");
	const [errorMessage, setErrorMessage] = createSignal("");

	const checkTimestamp = async () => {
		try {
			setTimestampState("loading");
			setErrorMessage("");

			const response = await getTimestamp();

			if (response.result === "error") {
				setTimestampState("error");
				setErrorMessage(response.error || "An unexpected error occurred.");
				return;
			}

			if (response.timestamp && response.timestamp > deadlineUnixtime) {
				setTimestampState("expired");
			} else {
				setTimestampState("valid");
			}
		} catch (error) {
			console.error("Timestamp check error:", error);
			setTimestampState("error");
			setErrorMessage(
				error instanceof Error
					? error.message
					: "An unexpected error occurred.",
			);
		}
	};

	onMount(() => {
		checkTimestamp();
	});

	return {
		timestampState,
		errorMessage,
		checkTimestamp,
	};
}
