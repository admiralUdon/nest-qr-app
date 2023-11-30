export class CustomHttpResponseType<T = any> {
    code: string;
    message: string;
    statusCode: number;
    module?: string;
    additionalMessage?: any;
    error?: string;
    data?: T;
    pagination?: Pagination
}

export interface Pagination {
    length: number;
    pageSize: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}