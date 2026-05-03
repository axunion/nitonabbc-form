import { createRoot } from "solid-js";
import { describe, expect, it, vi } from "vitest";
import { fetchData } from "@/services/api";
import { useDataFetch } from "./useDataFetch";

vi.mock("@/services/api", () => ({
  checkExpiration: vi.fn(),
  submitForm: vi.fn(),
  fetchData: vi.fn(),
}));

describe("useDataFetch", () => {
  it("成功時はデータを返す", async () => {
    const rows = [["row1col1", "row1col2"]];
    vi.mocked(fetchData).mockResolvedValue({ result: "done", data: rows });

    const [{ confirmData }, dispose] = createRoot(
      (d) => [useDataFetch({ type: "202506a" }), d] as const,
    );
    try {
      await vi.waitFor(() => {
        if (confirmData.state !== "ready") throw new Error("loading");
      });
      expect(confirmData()).toEqual(rows);
    } finally {
      dispose();
    }
  });

  it("result:error のとき state が errored になる", async () => {
    vi.mocked(fetchData).mockResolvedValue({
      result: "error",
      error: "Not found",
    });

    const [{ confirmData }, dispose] = createRoot(
      (d) => [useDataFetch({ type: "202506a" }), d] as const,
    );
    try {
      await vi.waitFor(() => {
        if (confirmData.state !== "errored") throw new Error("not errored yet");
      });
      expect(confirmData.error).toBeInstanceOf(Error);
    } finally {
      dispose();
    }
  });

  it("params なしの場合 state は unresolved のまま（フェッチャーは呼ばれない）", () => {
    // createResource(() => undefined, fetcher) は source が falsy のときフェッチャーを呼ばない
    const [{ confirmData }, dispose] = createRoot(
      (d) => [useDataFetch(), d] as const,
    );
    try {
      expect(confirmData.state).toBe("unresolved");
    } finally {
      dispose();
    }
  });
});
