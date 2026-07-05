export type ApiMode = "real" | "mock-ok" | "mock-err";

const STORAGE_KEY = "dev:apiMode";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function getApiMode(): ApiMode {
  if (!import.meta.env.DEV) return "real";

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY) as ApiMode | null;
    if (stored === "real" || stored === "mock-ok" || stored === "mock-err") {
      return stored;
    }
  }

  return "mock-ok";
}

export function setApiMode(mode: ApiMode): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, mode);
  }
}

// Accepts the already-resolved mode so callers can use their own (mockable) getApiMode import.
export async function tryMockResponse<T>(
  mode: ApiMode,
  okPayload: T,
  errPayload: T,
  delayMs: number,
  extraLog?: Record<string, unknown>,
): Promise<T | null> {
  if (!import.meta.env.DEV || mode === "real") return null;
  await sleep(delayMs);
  const result = mode === "mock-err" ? errPayload : okPayload;
  console.log("Mock response:", result);
  if (extraLog) {
    for (const [k, v] of Object.entries(extraLog)) console.log(`${k}:`, v);
  }
  return result;
}
