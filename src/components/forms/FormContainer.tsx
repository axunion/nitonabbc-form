import ErrorMessage from "@/components/forms/ErrorMessage";
import ExpiredMessage from "@/components/forms/ExpiredMessage";
import LoadingSpinner from "@/components/forms/LoadingSpinner";
import SubmissionLoader from "@/components/forms/SubmissionLoader";
import SuccessMessage from "@/components/forms/SuccessMessage";
import type { SubmissionState } from "@/hooks/useForm";
import { useTimestamp } from "@/hooks/useTimestamp";
import { type JSX, Show } from "solid-js";

export type FormContainerProps = {
	isSubmitting: () => boolean;
	submissionState: () => SubmissionState;
	children: JSX.Element;
	deadline?: number;
	expiredMessage?: string;
	successTitle?: string;
	successMessage?: string;
	errorTitle?: string;
	errorMessage?: string;
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
				<ExpiredMessage>
					<p>{props.expiredMessage || "このフォームは終了しています。"}</p>
				</ExpiredMessage>
			</Show>

			<Show when={timestampState() === "error"}>
				<ErrorMessage>
					<>
						<h2 class="text-xl font-bold text-red-800 mb-4">
							接続エラーが発生しました
						</h2>
						<p class="text-red-600 text-sm">
							恐れ入りますが、しばらく時間をおいて再度お試しください。
						</p>
					</>
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
						<>
							<h2 class="text-xl font-bold text-green-800 mb-4">
								{props.successTitle || "送信が完了しました"}
							</h2>
							<p class="text-green-700 mb-4">
								{props.successMessage || "ありがとうございました。"}
							</p>
						</>
					</SuccessMessage>
				</Show>

				<Show when={props.submissionState() === "error"}>
					<ErrorMessage>
						<>
							<h2 class="text-xl font-bold text-red-800 mb-4">
								{props.errorTitle || "送信に失敗しました"}
							</h2>
							<p class="text-red-700 mb-4">
								{props.errorMessage || "恐れ入りますが、再度お試しください。"}
							</p>
						</>
					</ErrorMessage>
				</Show>
			</Show>

			<SubmissionLoader isVisible={props.isSubmitting()} />
		</>
	);
}
