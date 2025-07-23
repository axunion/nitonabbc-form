import { fetchData } from "@/services/api";
import { createResource } from "solid-js";

export type ConfirmData = unknown[][];

export function useConfirm(params?: Record<string, string>) {
	const [confirmData, { refetch, mutate }] = createResource(
		() => params,
		async (fetchParams?: Record<string, string>): Promise<ConfirmData> => {
			const response = await fetchData<ConfirmData>(fetchParams);

			if (response.result === "done") {
				return response.data;
			}

			throw new Error(response.error || "Unknown error occurred");
		},
	);

	return { confirmData, refetch, mutate };
}
