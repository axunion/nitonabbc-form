import { createSignal, onMount } from "solid-js";
import { type ApiMode, getApiMode, setApiMode } from "@/services/mock-api";

const MODE_CONFIG: Record<
	ApiMode,
	{ label: string; bg: string; title: string }
> = {
	"mock-ok": {
		label: "OK",
		bg: "bg-emerald-500",
		title: "モックAPI(正常) - クリックでエラーに切替",
	},
	"mock-err": {
		label: "ERR",
		bg: "bg-red-500",
		title: "モックAPI(エラー) - クリックで本番APIに切替",
	},
	real: {
		label: "API",
		bg: "bg-blue-600",
		title: "本番API - クリックでモック(正常)に切替",
	},
};

const MODE_CYCLE: ApiMode[] = ["mock-ok", "mock-err", "real"];

export default function DevApiToggle() {
	const [mode, setMode] = createSignal<ApiMode>("mock-ok");

	onMount(() => {
		setMode(getApiMode());
	});

	const toggle = () => {
		const currentIndex = MODE_CYCLE.indexOf(mode());
		const nextIndex = (currentIndex + 1) % MODE_CYCLE.length;
		const nextMode = MODE_CYCLE[nextIndex];
		setMode(nextMode);
		setApiMode(nextMode);
	};

	const config = () => MODE_CONFIG[mode()];

	return (
		<button
			type="button"
			onClick={toggle}
			class={`fixed top-4 right-4 z-50 w-12 h-12 rounded-full shadow-lg text-xs font-bold text-white transition-colors ${config().bg}`}
			title={config().title}
		>
			{config().label}
		</button>
	);
}
