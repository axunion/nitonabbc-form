import { describe, expect, it, vi } from "vitest";
import { getReCaptchaToken } from "./recaptcha";

vi.mock("@/config/env", () => ({
  config: {
    recaptcha: { siteKey: "test-site-key" },
    googleAppsScript: {
      postToSheetUrl: "",
      fetchFromSheetUrl: "",
      createSheetUrl: "",
    },
  },
}));

describe("getReCaptchaToken", () => {
  it("window.grecaptcha が未定義の場合は reject する", async () => {
    await expect(getReCaptchaToken()).rejects.toThrow("reCAPTCHA not loaded");
  });

  it("grecaptcha.ready → execute でトークンを resolve する", async () => {
    const mockToken = "mock-recaptcha-token";
    vi.stubGlobal("grecaptcha", {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockResolvedValue(mockToken),
    });
    const token = await getReCaptchaToken("submit");
    expect(token).toBe(mockToken);
    expect(window.grecaptcha.execute).toHaveBeenCalledWith("test-site-key", {
      action: "submit",
    });
  });

  it("デフォルトの action は 'submit'", async () => {
    vi.stubGlobal("grecaptcha", {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockResolvedValue("token"),
    });
    await getReCaptchaToken();
    expect(window.grecaptcha.execute).toHaveBeenCalledWith("test-site-key", {
      action: "submit",
    });
  });

  it("execute が reject した場合は reject を伝播する", async () => {
    vi.stubGlobal("grecaptcha", {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockRejectedValue(new Error("execute failed")),
    });
    await expect(getReCaptchaToken()).rejects.toThrow("execute failed");
  });
});
