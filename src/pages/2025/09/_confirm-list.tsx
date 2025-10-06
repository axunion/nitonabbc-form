import { LoadingSpinner } from "@/components/forms";
import { useDataFetch } from "@/hooks/useDataFetch";
import { For, Show, createMemo } from "solid-js";

// ステータス,最新,参加費,氏名,①夕食,①宿泊,②朝食,②昼食,分科会 第一希望,分科会 第二希望
type ConfirmListItem = [
	string,
	boolean,
	number,
	string,
	boolean,
	boolean,
	boolean,
	boolean,
	string,
	string,
];

const I = {
	STATUS: 0,
	LATEST: 1,
	FEE: 2,
	FULL_NAME: 3,
	DAY1_DINNER: 4,
	DAY1_ACCOMMODATION: 5,
	DAY2_BREAKFAST: 6,
	DAY2_LUNCH: 7,
	WORKSHOP1: 8,
	WORKSHOP2: 9,
} as const;

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
	const cardClass = `mx-4 p-4 bg-white rounded shadow ${fadeInClass}`;
	const { confirmData } = useDataFetch<ConfirmListItem[]>(params);

	const validParticipants = createMemo(() => {
		const data = confirmData();
		return (
			data?.filter(
				(item) => item[I.STATUS] === "申し込み完了" && item[I.LATEST],
			) ?? []
		);
	});

	const totalFee = createMemo(() => {
		return validParticipants().reduce(
			(sum, item) => sum + (item[I.FEE] || 0),
			0,
		);
	});

	return (
		<div class="py-4">
			<Show when={confirmData.state === "pending"}>
				<div class="min-h-80 flex justify-center items-center">
					<LoadingSpinner />
				</div>
			</Show>

			<Show when={confirmData.state === "errored"}>
				<div class={cardClass}>
					<p class="my-8 text-center text-red-600">
						{confirmData.error?.message || "エラーが発生しました"}
					</p>
				</div>
			</Show>

			<Show when={confirmData.state === "ready"}>
				<Show
					when={validParticipants().length > 0}
					fallback={
						<div class={cardClass}>
							<p class="my-8 text-center">データがありません</p>
						</div>
					}
				>
					<div class={cardClass}>
						<div class="font-bold text-center">
							<span class="tracking-wider">参加費合計</span>
							<span class="ml-2">{formatCurrency(totalFee())}</span>
						</div>
					</div>

					<div class="p-4 overflow-x-auto">
						<table
							class={`w-full min-w-max bg-white rounded shadow text-sm ${fadeInClass}`}
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
											<td class="p-3 text-left">{item[I.FULL_NAME]}</td>
											<For each={item.slice(I.DAY1_DINNER, I.DAY2_LUNCH + 1)}>
												{(val) => <td>{val ? "○" : ""}</td>}
											</For>
											<td class="p-3">
												{item[I.FEE] ? formatCurrency(item[I.FEE]) : "-"}
											</td>
											<td class="p-3">{item[I.WORKSHOP1] || "-"}</td>
											<td class="p-3">{item[I.WORKSHOP2] || "-"}</td>
										</tr>
									)}
								</For>
							</tbody>
						</table>
					</div>
				</Show>
			</Show>
		</div>
	);
}
