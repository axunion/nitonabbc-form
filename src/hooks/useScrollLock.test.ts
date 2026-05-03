import { createRoot, createSignal } from "solid-js";
import { afterEach, describe, expect, it } from "vitest";
import { useScrollLock } from "./useScrollLock";

afterEach(() => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.documentElement.style.overflow = "";
});

describe("useScrollLock", () => {
  it("isLocked=true のとき overflow を hidden に設定する", async () => {
    const dispose = createRoot((d) => {
      useScrollLock(true);
      return d;
    });
    // createEffect は非同期スケジューリングのため待機が必要
    await Promise.resolve();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overflow).toBe("hidden");
    dispose();
  });

  it("isLocked=false のとき overflow を変更しない", async () => {
    const dispose = createRoot((d) => {
      useScrollLock(false);
      return d;
    });
    await Promise.resolve();
    expect(document.body.style.overflow).toBe("");
    dispose();
  });

  it("dispose 時に overflow を元の値に復元する", async () => {
    document.body.style.overflow = "scroll";
    const dispose = createRoot((d) => {
      useScrollLock(true);
      return d;
    });
    await Promise.resolve();
    expect(document.body.style.overflow).toBe("hidden");
    dispose();
    expect(document.body.style.overflow).toBe("scroll");
  });

  it("signal が false → true になったとき overflow を hidden に設定する", async () => {
    let setLocked!: (v: boolean) => void;
    const dispose = createRoot((d) => {
      const [locked, setter] = createSignal(false);
      setLocked = setter;
      useScrollLock(locked);
      return d;
    });
    await Promise.resolve();
    expect(document.body.style.overflow).toBe("");
    setLocked(true);
    // signal 変更後のエフェクト再実行は同期
    expect(document.body.style.overflow).toBe("hidden");
    dispose();
  });
});
