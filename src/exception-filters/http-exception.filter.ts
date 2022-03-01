import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    const finalErrorResponse = {
        statusCode: status,
        error: errorResponse['error'],
        message: errorResponse['message'] || errorResponse,
        path: request.url,
        method: request.method,
        timestamp: new Date().toISOString()
    }
   
    return response.status(status).json(finalErrorResponse);
  }
}