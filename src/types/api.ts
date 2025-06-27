export type SubmissionStatus = "done" | "error";

export interface TimestampResponse {
	result: SubmissionStatus;
	timestamp: number;
	error: string;
}

export interface FormSubmissionResult {
	result: SubmissionStatus;
	error: string;
}
