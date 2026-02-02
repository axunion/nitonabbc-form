import { createResource } from "solid-js";
import { fetchData } from "@/services/api";

export function useDataFetch<T = unknown[][]>(
	params?: Record<string, string | number | boolean>,
) {
	const [confirmData, { refetch, mutate }] = createResource(
		() => params,
		async (
			fetchParams?: Record<string, string | number | boolean>,
		): Promise<T> => {
			const response = await fetchData<T>(fetchParams);

			if (response.result === "error") {
				throw new Error(response.error || "Unknown error occurred");
			}

			return response.data;
		},
	);

	return { confirmData, refetch, mutate };
}
