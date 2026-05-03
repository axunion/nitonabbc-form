import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("文字列をスペース区切りで結合する", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("falsy な値（false, null, undefined）を除外する", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("引数がすべて falsy の場合は空文字を返す", () => {
    expect(cn(false, null, undefined)).toBe("");
  });

  it("引数なしの場合は空文字を返す", () => {
    expect(cn()).toBe("");
  });

  it("単一の文字列をそのまま返す", () => {
    expect(cn("only")).toBe("only");
  });
});
