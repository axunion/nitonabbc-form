import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { useScrollLock } from "@/hooks/useScrollLock";
import styles from "./SubmissionLoader.module.css";

export type SubmissionLoaderProps = {
	isVisible: boolean;
};

export default function SubmissionLoader(props: SubmissionLoaderProps) {
	useScrollLock(() => props.isVisible);

	return (
		<Show when={props.isVisible}>
			<Portal>
				<div class={styles.overlay}>
					<div class={styles.dotContainer}>
						<div class={styles.dots}>
							<div
								class={styles.dot}
								style="animation-delay: 0ms; animation-duration: 0.8s"
							/>
							<div
								class={styles.dot}
								style="animation-delay: 200ms; animation-duration: 0.8s"
							/>
							<div
								class={styles.dot}
								style="animation-delay: 400ms; animation-duration: 0.8s"
							/>
						</div>
					</div>
				</div>
			</Portal>
		</Show>
	);
}
