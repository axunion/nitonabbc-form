import { createMemo, For, Show } from "solid-js";
import { LoadingSpinner } from "@/components/forms";
import { useDataFetch } from "@/hooks/useDataFetch";
import styles from "./_confirm-list.module.css";

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

const formatCurrency = (amount: number) => {
	return amount.toLocaleString("ja-JP", {
		style: "currency",
		currency: "JPY",
	});
};

export default function ConfirmList() {
	const urlParams = new URLSearchParams(window.location.search);
	const params = { type: "202509a", value: urlParams.get("v") || "" };

	if (!params.value) return;

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
		<div class={styles.container}>
			<Show when={confirmData.state === "pending"}>
				<div class={styles.loadingCenter}>
					<LoadingSpinner />
				</div>
			</Show>

			<Show when={confirmData.state === "errored"}>
				<div class={styles.card}>
					<p class={styles.errorText}>
						{confirmData.error?.message || "エラーが発生しました"}
					</p>
				</div>
			</Show>

			<Show when={confirmData.state === "ready"}>
				<Show
					when={validParticipants().length > 0}
					fallback={
						<div class={styles.card}>
							<p class={styles.emptyText}>データがありません</p>
						</div>
					}
				>
					<div class={styles.card}>
						<div class={styles.summary}>
							<span class={styles.summaryLabel}>参加費合計</span>
							<span class={styles.summaryValue}>
								{formatCurrency(totalFee())}
							</span>
						</div>
					</div>

					<div class={styles.tableWrapper}>
						<table class={styles.table}>
							<thead>
								<tr class={styles.headerRow}>
									<th class={styles.headerCell}>名前</th>
									<th class={styles.headerCellNarrow}>夕食</th>
									<th class={styles.headerCellNarrow}>宿泊</th>
									<th class={styles.headerCellNarrow}>朝食</th>
									<th class={styles.headerCellNarrow}>昼食</th>
									<th class={styles.headerCellMedium}>参加費</th>
									<th class={styles.headerCellWide}>分科会第一希望</th>
									<th class={styles.headerCellWide}>分科会第二希望</th>
								</tr>
							</thead>
							<tbody>
								<For each={validParticipants()}>
									{(item) => (
										<tr class={styles.dataRow}>
											<td class={styles.nameCell}>{item[I.FULL_NAME]}</td>
											<For each={item.slice(I.DAY1_DINNER, I.DAY2_LUNCH + 1)}>
												{(val) => <td>{val ? "○" : ""}</td>}
											</For>
											<td class={styles.dataCell}>
												{item[I.FEE] ? formatCurrency(item[I.FEE]) : "-"}
											</td>
											<td class={styles.dataCell}>
												{item[I.WORKSHOP1] || "-"}
											</td>
											<td class={styles.dataCell}>
												{item[I.WORKSHOP2] || "-"}
											</td>
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
