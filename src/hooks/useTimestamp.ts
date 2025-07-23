import { getTimestamp } from "@/services/api";
import { createResource } from "solid-js";

export type TimestampResult = "valid" | "expired";

export function useTimestamp(deadlineUnixtime: number) {
	const [timestampResult, { refetch }] = createResource(
		async (): Promise<TimestampResult> => {
			const response = await getTimestamp();

			if (response.result === "error") {
				throw new Error(response.error || "An unexpected error occurred.");
			}

			if (response.timestamp && response.timestamp > deadlineUnixtime) {
				return "expired";
			}

			return "valid";
		},
	);

	return { timestampResult, refetch };
}
