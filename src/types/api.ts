export type TimestampSuccessResponse = {
	result: "done";
	timestamp: number;
};

export type TimestampErrorResponse = {
	result: "error";
	error: string;
};

export type TimestampResponse =
	| TimestampSuccessResponse
	| TimestampErrorResponse;

export type FromSubmissionSuccessResponse = {
	result: "done";
};

export type FormSubmissionErrorResponse = {
	result: "error";
	error: string;
};

export type FormSubmissionResult =
	| FromSubmissionSuccessResponse
	| FormSubmissionErrorResponse;

export type FetchDataSuccessResponse<T> = {
	result: "done";
	data: T[];
};

export type FetchDataErrorResponse = {
	result: "error";
	error: string;
};

export type FetchDataResponse<T> =
	| FetchDataSuccessResponse<T>
	| FetchDataErrorResponse;
