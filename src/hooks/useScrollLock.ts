import { createEffect, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";

export function useScrollLock(isLocked: Accessor<boolean> | boolean) {
	createEffect(() => {
		if (typeof document === "undefined") return;

		const locked = typeof isLocked === "function" ? isLocked() : isLocked;

		if (locked) {
			const originalOverflow = document.body.style.overflow;
			const originalPaddingRight = document.body.style.paddingRight;
			const originalHtmlOverflow = document.documentElement.style.overflow;

			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;

			document.documentElement.style.overflow = "hidden";
			document.body.style.overflow = "hidden";

			if (scrollbarWidth > 0) {
				document.body.style.paddingRight = `${scrollbarWidth}px`;
			}

			onCleanup(() => {
				document.documentElement.style.overflow = originalHtmlOverflow;
				document.body.style.overflow = originalOverflow;
				document.body.style.paddingRight = originalPaddingRight;
			});
		}
	});
}
