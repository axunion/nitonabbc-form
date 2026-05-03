import { describe, expect, it } from "vitest";
import {
  getApiMode,
  setApiMode,
  shouldMockError,
  shouldUseMockApi,
} from "./mock-api";

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

describe("shouldUseMockApi", () => {
  it("デフォルト（mock-ok）では true を返す", () => {
    expect(shouldUseMockApi()).toBe(true);
  });

  it("mock-err では true を返す", () => {
    localStorage.setItem(STORAGE_KEY, "mock-err");
    expect(shouldUseMockApi()).toBe(true);
  });

  it("real では false を返す", () => {
    localStorage.setItem(STORAGE_KEY, "real");
    expect(shouldUseMockApi()).toBe(false);
  });
});

describe("shouldMockError", () => {
  it("mock-err では true を返す", () => {
    localStorage.setItem(STORAGE_KEY, "mock-err");
    expect(shouldMockError()).toBe(true);
  });

  it("デフォルト（mock-ok）では false を返す", () => {
    expect(shouldMockError()).toBe(false);
  });

  it("real では false を返す", () => {
    localStorage.setItem(STORAGE_KEY, "real");
    expect(shouldMockError()).toBe(false);
  });
});
