import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getApiMode, setApiMode, tryMockResponse } from "./mock-api";

const STORAGE_KEY = "dev:apiMode";

describe("getApiMode", () => {
  it("localStorage に値がない場合は mock-ok を返す", () => {
    expect(getApiMode()).toBe("mock-ok");
  });

  it("localStorage の real を読み取る", () => {
    localStorage.setItem(STORAGE_KEY, "real");
    expect(getApiMode()).toBe("real");
  });

  it("localStorage の mock-err を読み取る", () => {
    localStorage.setItem(STORAGE_KEY, "mock-err");
    expect(getApiMode()).toBe("mock-err");
  });

  it("localStorage の mock-ok を読み取る", () => {
    localStorage.setItem(STORAGE_KEY, "mock-ok");
    expect(getApiMode()).toBe("mock-ok");
  });

  it("localStorage に無効な値がある場合は mock-ok にフォールバックする", () => {
    localStorage.setItem(STORAGE_KEY, "invalid-value");
    expect(getApiMode()).toBe("mock-ok");
  });
});

describe("setApiMode", () => {
  it("localStorage にモードを書き込む", () => {
    setApiMode("real");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("real");
  });
});

describe("tryMockResponse", () => {
  type Payload =
    | { result: "done"; value: number }
    | { result: "error"; error: string };
  const ok: Payload = { result: "done", value: 1 };
  const err: Payload = { result: "error", error: "fail" };

  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("mock-ok のとき okPayload を返す", async () => {
    const promise = tryMockResponse<Payload>("mock-ok", ok, err, 500);
    await vi.runAllTimersAsync();
    expect(await promise).toEqual(ok);
  });

  it("mock-err のとき errPayload を返す", async () => {
    const promise = tryMockResponse<Payload>("mock-err", ok, err, 500);
    await vi.runAllTimersAsync();
    expect(await promise).toEqual(err);
  });

  it("real のとき null を返す（sleep しない）", async () => {
    const promise = tryMockResponse<Payload>("real", ok, err, 500);
    await vi.runAllTimersAsync();
    expect(await promise).toBeNull();
  });

  it("extraLog が渡されたとき console.log を追加出力する", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const promise = tryMockResponse<Payload>("mock-ok", ok, err, 0, {
      payload: "x",
    });
    await vi.runAllTimersAsync();
    await promise;
    const logs = spy.mock.calls.map((c) => c[0]);
    expect(logs).toContain("payload:");
    spy.mockRestore();
  });
});
