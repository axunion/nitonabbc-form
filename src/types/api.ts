export type ExpirationStatusSuccessResponse = {
	result: "done";
	expired: boolean;
};

export type ExpirationStatusErrorResponse = {
	result: "error";
	error: string;
};

export type ExpirationStatusResponse =
	| ExpirationStatusSuccessResponse
	| ExpirationStatusErrorResponse;

export type FormSubmissionSuccessResponse = {
	result: "done";
};

export type FormSubmissionErrorResponse = {
	result: "error";
	error: string;
};

export type FormSubmissionResult =
	| FormSubmissionSuccessResponse
	| FormSubmissionErrorResponse;

export type FetchDataSuccessResponse<T> = {
	result: "done";
	data: T;
};

export type FetchDataErrorResponse = {
	result: "error";
	error: string;
};

export type FetchDataResponse<T> =
	| FetchDataSuccessResponse<T>
	| FetchDataErrorResponse;
