export type ApiMode = "real" | "mock-ok" | "mock-err";

const STORAGE_KEY = "dev:apiMode";

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

export function shouldUseMockApi(): boolean {
	const mode = getApiMode();
	return mode === "mock-ok" || mode === "mock-err";
}

export function shouldMockError(): boolean {
	return getApiMode() === "mock-err";
}
