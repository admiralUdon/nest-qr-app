import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * TODO: Do documentation
 */
export class CustomHttpException extends HttpException {
    constructor(params: {
        message: string,
        statusCode: HttpStatus,
        module?: string;
        code?: string,
        additionalMessage?: any,
        error?: string,
    }) {
        const { statusCode, message, code, additionalMessage, error } = params;
        const { module } = (process.env.ENABLE_DEBUGGING !== "true") ? { module: undefined } : params;
        super({ statusCode, message, module, code, additionalMessage, error }, statusCode);
    }
}