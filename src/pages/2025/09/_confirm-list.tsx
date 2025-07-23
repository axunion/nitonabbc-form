import { LoadingSpinner } from "@/components/forms";
import { useConfirm } from "@/hooks/useComfirm";
import { For, Show } from "solid-js";

const urlParams = new URLSearchParams(window.location.search);
const params = { type: "202509a", value: urlParams.get("v") || "" };

export default function ConfirmList() {
	if (!params.value) return;

	const { confirmData } = useConfirm(params);

	return (
		<div class="px-4 py-2 overflow-x-auto">
			<Show when={confirmData.state === "pending"}>
				<div class="min-h-40 flex justify-center items-center">
					<LoadingSpinner />
				</div>
			</Show>

			<Show when={confirmData.state === "errored"}>
				<div class="text-center py-8">
					<p class="text-red-600">
						{confirmData.error?.message || "エラーが発生しました"}
					</p>
				</div>
			</Show>

			<Show when={confirmData.state === "ready"}>
				<Show
					when={(() => {
						const data = confirmData();
						return data && data.length > 0;
					})()}
					fallback={
						<div class="p-8 bg-white/80 rounded shadow animate-[fadeIn_0.5s_ease-out_forwards]">
							<p class="text-center text-gray-600">データがありません</p>
						</div>
					}
				>
					<table class="w-full min-w-max bg-white/80 rounded shadow text-sm animate-[fadeIn_0.5s_ease-out_forwards]">
						<thead>
							<tr class="border-b border-gray-300">
								<th class="p-3 min-w-max">名前</th>
								<th class="w-12">夕食</th>
								<th class="w-12">宿泊</th>
								<th class="w-12">朝食</th>
								<th class="w-12">昼食</th>
								<th class="w-60">分科会第一希望</th>
								<th class="w-60">分科会第二希望</th>
							</tr>
						</thead>
						<tbody>
							<For each={confirmData()}>
								{(item) => (
									<tr class="even:bg-gray-50 text-center">
										<td class="p-3 text-left">{String(item[0] || "")}</td>
										<For each={(item as string[]).slice(1, 5)}>
											{(val) => <td>{val ? "○" : ""}</td>}
										</For>
										<td class="p-3">{String((item as string[])[5] || "-")}</td>
										<td class="p-3">{String((item as string[])[6] || "-")}</td>
									</tr>
								)}
							</For>
						</tbody>
					</table>
				</Show>
			</Show>
		</div>
	);
}
