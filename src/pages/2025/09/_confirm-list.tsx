import { LoadingSpinner } from "@/components/forms";
import { useConfirm } from "@/hooks/useComfirm";
import { For, Show, createMemo } from "solid-js";

// 氏名,①夕食,①宿泊,②朝食,②昼食,分科会 第一希望,分科会 第二希望,キャンセル,最新,参加費
type ConfirmListItem = [
	string,
	boolean,
	boolean,
	boolean,
	boolean,
	string,
	string,
	boolean,
	boolean,
	number,
];

const urlParams = new URLSearchParams(window.location.search);
const params = { type: "202509a", value: urlParams.get("v") || "" };

const formatCurrency = (amount: number) => {
	return amount.toLocaleString("ja-JP", {
		style: "currency",
		currency: "JPY",
	});
};

export default function ConfirmList() {
	if (!params.value) return;

	const fadeInClass = "animate-[fadeIn_0.5s_ease-out_forwards]";
	const cardClass = `p-8 bg-white/80 rounded shadow ${fadeInClass}`;
	const { confirmData } = useConfirm<ConfirmListItem>(params);

	const validParticipants = createMemo(() => {
		const data = confirmData();
		return data?.filter((item) => !item[7] && item[8]) ?? [];
	});

	const totalFee = createMemo(() => {
		return validParticipants().reduce((sum, item) => sum + (item[9] || 0), 0);
	});

	return (
		<div class="px-4 py-2 overflow-x-auto">
			<Show when={confirmData.state === "pending"}>
				<div class="min-h-40 flex justify-center items-center">
					<LoadingSpinner />
				</div>
			</Show>

			<Show when={confirmData.state === "errored"}>
				<div class={cardClass}>
					<p class="text-center text-red-600">
						{confirmData.error?.message || "エラーが発生しました"}
					</p>
				</div>
			</Show>

			<Show when={confirmData.state === "ready"}>
				<Show
					when={validParticipants().length > 0}
					fallback={
						<div class={cardClass}>
							<p class="text-center">データがありません</p>
						</div>
					}
				>
					<div
						class={`mb-4 p-4 bg-white border border-gray-300 rounded-md ${fadeInClass}`}
					>
						<div class="font-bold text-center">
							参加費合計：{formatCurrency(totalFee())}
						</div>
					</div>

					<table
						class={`w-full min-w-max bg-white/80 rounded shadow text-sm ${fadeInClass}`}
					>
						<thead>
							<tr class="border-b border-gray-300">
								<th class="p-3 min-w-max">名前</th>
								<th class="w-12">夕食</th>
								<th class="w-12">宿泊</th>
								<th class="w-12">朝食</th>
								<th class="w-12">昼食</th>
								<th class="w-20">参加費</th>
								<th class="w-60">分科会第一希望</th>
								<th class="w-60">分科会第二希望</th>
							</tr>
						</thead>
						<tbody>
							<For each={validParticipants()}>
								{(item) => (
									<tr class="even:bg-gray-50 text-center">
										<td class="p-3 text-left">{item[0]}</td>
										<For each={item.slice(1, 5)}>
											{(val) => <td>{val ? "○" : ""}</td>}
										</For>
										<td class="p-3">
											{item[9] ? formatCurrency(item[9]) : "-"}
										</td>
										<td class="p-3">{item[5] || "-"}</td>
										<td class="p-3">{item[6] || "-"}</td>
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
