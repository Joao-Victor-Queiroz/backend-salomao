import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

interface ValidationExceptionResponse {
  message: string;
  errorCode?: string;
  [key: string]: any; // caso outros campos surjam
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof Error ? exception.message : 'Internal Server Error';

    let extraFields = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse =
        exception.getResponse() as ValidationExceptionResponse;

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const { message: msg, ...rest } = exceptionResponse;
        message = msg || message;
        extraFields = rest;
      } else {
        message = exceptionResponse || message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(
      `Path: ${request.url} | Method: ${request.method} | Error: ${message}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toLocaleDateString('pt-BR'),
      path: request.url,
      message: message,
      ...extraFields,
    });
  }
}
