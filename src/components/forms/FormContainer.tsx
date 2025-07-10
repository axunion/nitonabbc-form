import ErrorMessage from "@/components/forms/ErrorMessage.tsx";
import ExpiredMessage from "@/components/forms/ExpiredMessage.tsx";
import LoadingSpinner from "@/components/forms/LoadingSpinner.tsx";
import SubmissionLoader from "@/components/forms/SubmissionLoader.tsx";
import SuccessMessage from "@/components/forms/SuccessMessage.tsx";
import type { SubmissionState } from "@/hooks/useForm";
import { useTimestamp } from "@/hooks/useTimestamp";
import { type JSX, Show } from "solid-js";

export type FormContainerProps = {
	isSubmitting: () => boolean;
	submissionState: () => SubmissionState;
	deadline?: number;
	successMessage?: string;
	errorMessage?: string;
	children: JSX.Element;
};

export default function FormContainer(props: FormContainerProps) {
	const deadline = props.deadline ?? Number.MAX_SAFE_INTEGER;
	const { timestampState } = useTimestamp(deadline);

	return (
		<>
			<Show when={timestampState() === "loading"}>
				<div class="flex items-center justify-center">
					<LoadingSpinner />
				</div>
			</Show>

			<Show when={timestampState() === "expired"}>
				<ExpiredMessage />
			</Show>

			<Show when={timestampState() === "error"}>
				<ErrorMessage>
					<h2 class="text-2xl font-bold text-red-800 mb-4">
						接続エラーが発生しました
					</h2>
					<p class="text-red-600 text-sm">
						恐れ入りますが、しばらく時間をおいて再度お試しください。
					</p>
				</ErrorMessage>
			</Show>

			<Show when={timestampState() === "valid"}>
				<Show
					when={
						props.submissionState() === "idle" ||
						props.submissionState() === "submitting"
					}
				>
					{props.children}
				</Show>

				<Show when={props.submissionState() === "success"}>
					<SuccessMessage>
						<h2 class="text-2xl font-bold text-green-800 mb-4">
							送信が完了しました
						</h2>
						<p class="text-green-700 mb-4">
							{props.successMessage || "ありがとうございました。"}
						</p>
					</SuccessMessage>
				</Show>

				<Show when={props.submissionState() === "error"}>
					<ErrorMessage>
						<h2 class="text-2xl font-bold text-red-800 mb-4">
							送信に失敗しました
						</h2>
						<p class="text-red-700 mb-4">
							{props.errorMessage || "恐れ入りますが、再度お試しください。"}
						</p>
					</ErrorMessage>
				</Show>
			</Show>

			<SubmissionLoader isVisible={props.isSubmitting()} />
		</>
	);
}
