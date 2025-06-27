import { getTimestamp } from "@/services/api";
import { createSignal, onMount } from "solid-js";

export type TimestampState = "loading" | "valid" | "expired" | "error";

export function useTimestamp(deadlineTimestamp: number) {
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
				setErrorMessage(response.error || "タイムスタンプの取得に失敗しました");
				return;
			}

			const currentTime = response.timestamp;
			if (currentTime > deadlineTimestamp) {
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
					: "タイムスタンプの確認中にエラーが発生しました",
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
