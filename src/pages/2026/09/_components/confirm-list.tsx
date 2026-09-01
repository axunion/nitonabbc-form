import { createMemo, For, Show } from "solid-js";
import { ErrorMessage, LoadingSpinner } from "@/components/forms";
import { useDataFetch } from "@/hooks/useDataFetch";
import {
  CHECK_COLUMNS,
  type ConfirmListItem,
  filterValidParticipants,
  formatCheck,
  formatCurrency,
  I,
} from "./calc-confirm-list";
import styles from "./confirm-list.module.css";

export default function ConfirmList() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = { type: "202609a", value: urlParams.get("v") || "" };

  if (!params.value) return;

  const { confirmData } = useDataFetch<ConfirmListItem[]>(params);

  const validParticipants = createMemo(() =>
    filterValidParticipants(confirmData() ?? []),
  );

  const totalFee = createMemo(() =>
    validParticipants().reduce((sum, item) => sum + item[I.FEE], 0),
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
              <div class={styles.summaryItem}>
                <span class={styles.summaryLabel}>参加人数</span>
                <span class={styles.summaryValue}>
                  {validParticipants().length}
                  <span class={styles.summaryUnit}>名</span>
                </span>
              </div>
              <div class={styles.summaryDivider} />
              <div class={styles.summaryItem}>
                <span class={styles.summaryLabel}>参加費合計</span>
                <span class={styles.summaryValue}>
                  {formatCurrency(totalFee())}
                </span>
              </div>
            </div>
          </div>

          <div class={styles.tableWrapper}>
            <table class={styles.table}>
              <thead>
                <tr class={styles.headerRow}>
                  <th class={styles.headerCellMedium}>参加費</th>
                  <th class={styles.headerCell}>氏名</th>
                  <For each={CHECK_COLUMNS}>
                    {([label]) => (
                      <th class={styles.headerCellNarrow}>{label}</th>
                    )}
                  </For>
                  <th class={styles.headerCell}>分科会</th>
                  <th class={styles.headerCell}>レクリエーション</th>
                </tr>
              </thead>
              <tbody>
                <For each={validParticipants()}>
                  {(item) => (
                    <tr class={styles.dataRow}>
                      <td class={styles.dataCell}>
                        {formatCurrency(item[I.FEE])}
                      </td>
                      <td class={styles.nameCell}>{item[I.FULL_NAME]}</td>
                      <For each={CHECK_COLUMNS}>
                        {([, index]) => (
                          <td class={styles.dataCell}>
                            {formatCheck(item[index])}
                          </td>
                        )}
                      </For>
                      <td class={styles.dataCell}>{item[I.WORKSHOP] || "-"}</td>
                      <td class={styles.dataCell}>
                        {item[I.RECREATION] || "-"}
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
