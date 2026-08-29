import { createMemo, For, Show } from "solid-js";
import { ErrorMessage, LoadingSpinner } from "@/components/forms";
import { useDataFetch } from "@/hooks/useDataFetch";
import {
  type ConfirmListItem,
  calcItemFee,
  filterValidParticipants,
  formatParticipationDays,
  I,
} from "./calc-confirm-list";
import styles from "./confirm-list.module.css";

const formatCurrency = (amount: number) => `¥${amount.toLocaleString()}`;

export default function ConfirmList() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = { type: "202609a", value: urlParams.get("v") || "" };

  if (!params.value) return;

  const { confirmData } = useDataFetch<ConfirmListItem[]>(params);

  const validParticipants = createMemo(() =>
    filterValidParticipants(confirmData() ?? []),
  );

  const itemFees = createMemo(() => validParticipants().map(calcItemFee));

  const totalFee = createMemo(() =>
    itemFees().reduce((sum, fee) => sum + fee, 0),
  );

  return (
    <div class={styles.container}>
      <Show when={confirmData.state === "pending"}>
        <div class={styles.loadingCenter}>
          <LoadingSpinner />
        </div>
      </Show>

      <Show when={confirmData.state === "errored"}>
        <ErrorMessage>
          <p>{confirmData.error?.message || "エラーが発生しました"}</p>
        </ErrorMessage>
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
              <span class={styles.summaryLabel}>参加人数</span>
              <span class={styles.summaryValue}>
                {validParticipants().length}名
              </span>
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
                  <th class={styles.headerCell}>教会名</th>
                  <th class={styles.headerCell}>氏名</th>
                  <th class={styles.headerCell}>ふりがな</th>
                  <th class={styles.headerCellNarrow}>年齢</th>
                  <th class={styles.headerCellNarrow}>性別</th>
                  <th class={styles.headerCellNarrow}>立場</th>
                  <th class={styles.headerCellNarrow}>区分</th>
                  <th class={styles.headerCellWide}>参加日程</th>
                  <th class={styles.headerCell}>分科会</th>
                  <th class={styles.headerCell}>レクリエーション</th>
                  <th class={styles.headerCellMedium}>参加費</th>
                </tr>
              </thead>
              <tbody>
                <For each={validParticipants()}>
                  {(item, index) => (
                    <tr class={styles.dataRow}>
                      <td class={styles.nameCell}>{item[I.CHURCH_NAME]}</td>
                      <td class={styles.nameCell}>{item[I.FULL_NAME]}</td>
                      <td class={styles.nameCell}>{item[I.KANA_NAME]}</td>
                      <td class={styles.dataCell}>{item[I.AGE]}</td>
                      <td class={styles.dataCell}>{item[I.GENDER]}</td>
                      <td class={styles.dataCell}>{item[I.FAITH_STATUS]}</td>
                      <td class={styles.dataCell}>{item[I.AGE_CATEGORY]}</td>
                      <td class={styles.dataCell}>
                        {formatParticipationDays(item)}
                      </td>
                      <td class={styles.dataCell}>{item[I.WORKSHOP] || "-"}</td>
                      <td class={styles.dataCell}>
                        {item[I.RECREATION] || "-"}
                      </td>
                      <td class={styles.dataCell}>
                        {formatCurrency(itemFees()[index()])}
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
