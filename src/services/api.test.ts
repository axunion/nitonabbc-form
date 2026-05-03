import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { shouldMockError, shouldUseMockApi } from "@/services/mock-api";
import { checkExpiration, fetchData, submitForm } from "./api";

vi.mock("@/config/env", () => ({
  config: {
    recaptcha: { siteKey: "test-site-key" },
    googleAppsScript: {
      postToSheetUrl: "https://script.google.com/post",
      fetchFromSheetUrl: "https://script.google.com/fetch",
      createSheetUrl: "https://script.google.com/create",
    },
  },
}));

vi.mock("@/services/mock-api", () => ({
  shouldUseMockApi: vi.fn(),
  shouldMockError: vi.fn(),
}));

describe("checkExpiration", () => {
  describe("mock path", () => {
    beforeEach(() => {
      vi.mocked(shouldUseMockApi).mockReturnValue(true);
      vi.useFakeTimers();
    });
    afterEach(() => vi.useRealTimers());

    it("shouldMockError=false のとき done + expired:false を返す", async () => {
      vi.mocked(shouldMockError).mockReturnValue(false);
      const promise = checkExpiration("202506a");
      await vi.runAllTimersAsync();
      const result = await promise;
      expect(result).toEqual({ result: "done", expired: false });
    });

    it("shouldMockError=true のとき error を返す", async () => {
      vi.mocked(shouldMockError).mockReturnValue(true);
      const promise = checkExpiration("202506a");
      await vi.runAllTimersAsync();
      const result = await promise;
      expect(result.result).toBe("error");
    });
  });

  describe("real path", () => {
    beforeEach(() => {
      vi.mocked(shouldUseMockApi).mockReturnValue(false);
    });

    it("fetch 成功時は JSON を返す", async () => {
      const mockResponse = { result: "done", expired: false };
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        }),
      );
      const result = await checkExpiration("202506a");
      expect(result).toEqual(mockResponse);
    });

    it("type パラメータが URL に含まれる", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ result: "done", expired: false }),
      });
      vi.stubGlobal("fetch", mockFetch);
      await checkExpiration("202506a");
      const calledUrl = mockFetch.mock.calls[0][0] as string;
      expect(calledUrl).toContain("type=202506a");
    });

    it("HTTP エラーは { result: 'error' } を返す", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
        }),
      );
      const result = await checkExpiration("202506a");
      expect(result.result).toBe("error");
    });

    it("fetch が throw した場合は { result: 'error' } を返す", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValue(new Error("Network error")),
      );
      const result = await checkExpiration("202506a");
      expect(result.result).toBe("error");
      if (result.result === "error") {
        expect(result.error).toBe("Network error");
      }
    });
  });
});

describe("submitForm", () => {
  describe("mock path", () => {
    beforeEach(() => {
      vi.mocked(shouldUseMockApi).mockReturnValue(true);
      vi.useFakeTimers();
    });
    afterEach(() => vi.useRealTimers());

    it("shouldMockError=false のとき { result: 'done' } を返す", async () => {
      vi.mocked(shouldMockError).mockReturnValue(false);
      const promise = submitForm({ name: "テスト" }, "token");
      await vi.runAllTimersAsync();
      expect(await promise).toEqual({ result: "done" });
    });

    it("shouldMockError=true のとき error を返す", async () => {
      vi.mocked(shouldMockError).mockReturnValue(true);
      const promise = submitForm({ name: "テスト" }, "token");
      await vi.runAllTimersAsync();
      const result = await promise;
      expect(result.result).toBe("error");
    });
  });

  describe("real path", () => {
    beforeEach(() => {
      vi.mocked(shouldUseMockApi).mockReturnValue(false);
    });

    it("POST body に recaptchaToken と formData を含む", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ result: "done" }),
      });
      vi.stubGlobal("fetch", mockFetch);
      await submitForm({ name: "テスト", type: "202506a" }, "my-token");
      const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      const body = JSON.parse(options.body as string);
      expect(body).toEqual({
        recaptchaToken: "my-token",
        name: "テスト",
        type: "202506a",
      });
    });

    it("HTTP エラーは { result: 'error' } を返す", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
          status: 503,
          statusText: "Service Unavailable",
        }),
      );
      const result = await submitForm({}, "token");
      expect(result.result).toBe("error");
    });

    it("fetch が throw した場合は { result: 'error' } を返す", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Timeout")));
      const result = await submitForm({}, "token");
      expect(result.result).toBe("error");
      if (result.result === "error") {
        expect(result.error).toBe("Timeout");
      }
    });
  });
});

describe("fetchData", () => {
  describe("mock path", () => {
    beforeEach(() => {
      vi.mocked(shouldUseMockApi).mockReturnValue(true);
      vi.useFakeTimers();
    });
    afterEach(() => vi.useRealTimers());

    it("shouldMockError=false のとき { result: 'done', data: [] } を返す", async () => {
      vi.mocked(shouldMockError).mockReturnValue(false);
      const promise = fetchData();
      await vi.runAllTimersAsync();
      expect(await promise).toEqual({ result: "done", data: [] });
    });
  });

  describe("real path", () => {
    beforeEach(() => {
      vi.mocked(shouldUseMockApi).mockReturnValue(false);
    });

    it("params が URL クエリに付与される", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ result: "done", data: [] }),
      });
      vi.stubGlobal("fetch", mockFetch);
      await fetchData({ type: "202506a", sheet: "1" });
      const calledUrl = mockFetch.mock.calls[0][0] as string;
      expect(calledUrl).toContain("type=202506a");
      expect(calledUrl).toContain("sheet=1");
    });

    it("params なしでも fetch できる", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ result: "done", data: ["row1"] }),
      });
      vi.stubGlobal("fetch", mockFetch);
      const result = await fetchData();
      expect(result).toEqual({ result: "done", data: ["row1"] });
    });

    it("HTTP エラーは { result: 'error' } を返す", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
          status: 404,
          statusText: "Not Found",
        }),
      );
      const result = await fetchData();
      expect(result.result).toBe("error");
    });
  });
});
