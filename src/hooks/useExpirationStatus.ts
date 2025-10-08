import { createResource } from "solid-js";
import { checkExpiration } from "@/services/api";

export type ExpirationStatus = "valid" | "expired";

export function useExpirationStatus(type: string) {
	const [expirationStatus, { refetch }] = createResource(
		async (): Promise<ExpirationStatus> => {
			const response = await checkExpiration(type);

			if (response.result === "error") {
				throw new Error(response.error || "An unexpected error occurred.");
			}

			if (response.expired) {
				return "expired";
			}

			return "valid";
		},
	);

	return { expirationStatus, refetch };
}
