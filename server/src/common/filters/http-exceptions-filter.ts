import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.getStatus()
    // exception.getStatus();
    const exceptionResponse = exception.getResponse()
    let message = exceptionResponse.message ?? 'Service Error'

    if (Array.isArray(exceptionResponse?.message)) {
      message = exceptionResponse.message[0]
    }

    response.status(200).json({
      code: status,
      msg: message,
      data: null,
    })
  }
}
