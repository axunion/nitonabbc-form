import { createRoot } from "solid-js";
import { describe, expect, it, vi } from "vitest";
import { checkExpiration } from "@/services/api";
import { useExpirationStatus } from "./useExpirationStatus";

vi.mock("@/services/api", () => ({
  checkExpiration: vi.fn(),
  submitForm: vi.fn(),
  fetchData: vi.fn(),
}));

describe("useExpirationStatus", () => {
  it("expired:false のとき 'valid' を返す", async () => {
    vi.mocked(checkExpiration).mockResolvedValue({
      result: "done",
      expired: false,
    });
    const [{ expirationStatus }, dispose] = createRoot(
      (d) => [useExpirationStatus("202506a"), d] as const,
    );
    try {
      await vi.waitFor(() => {
        if (expirationStatus.state !== "ready") throw new Error("loading");
      });
      expect(expirationStatus()).toBe("valid");
    } finally {
      dispose();
    }
  });

  it("expired:true のとき 'expired' を返す", async () => {
    vi.mocked(checkExpiration).mockResolvedValue({
      result: "done",
      expired: true,
    });
    const [{ expirationStatus }, dispose] = createRoot(
      (d) => [useExpirationStatus("202506a"), d] as const,
    );
    try {
      await vi.waitFor(() => {
        if (expirationStatus.state !== "ready") throw new Error("loading");
      });
      expect(expirationStatus()).toBe("expired");
    } finally {
      dispose();
    }
  });

  it("result:error のとき throw する（state が errored）", async () => {
    vi.mocked(checkExpiration).mockResolvedValue({
      result: "error",
      error: "Connection failed",
    });
    const [{ expirationStatus }, dispose] = createRoot(
      (d) => [useExpirationStatus("202506a"), d] as const,
    );
    try {
      await vi.waitFor(() => {
        if (expirationStatus.state !== "errored")
          throw new Error("not errored yet");
      });
      expect(expirationStatus.error).toBeInstanceOf(Error);
    } finally {
      dispose();
    }
  });
});
