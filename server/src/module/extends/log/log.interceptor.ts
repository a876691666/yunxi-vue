import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

import { ExtendsLogService } from 'src/module/extends/log/log.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger: Logger;

  private readonly reflector = new Reflector();

  constructor(readonly logService: ExtendsLogService) {
    this.logger = new Logger('扩展 - 日志', { timestamp: false });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [tagName] = this.reflector.getAllAndOverride(`swagger/apiUseTags`, [context.getClass()]);
    const { summary } = this.reflector.getAllAndOverride(`swagger/apiOperation`, [context.getHandler()]);

    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    const classMethod = `${className}.${handlerName}`;
    const classMethodTitle = `${tagName}:${summary}`;

    const now = Date.now();

    return next
      .handle()
      .pipe(
        map((handleResult) => {
          const handleCostTime = Date.now() - now;

          this.logger.log(`[${classMethod}] ${classMethodTitle} ${handleCostTime}ms`);
          this.logService.logAction({ classMethod, classMethodTitle, handleCostTime, handleResult });

          return handleResult;
        }),
      )
      .pipe(
        catchError((err) => {
          const handleCostTime = Date.now() - now;

          this.logger.error(`[${classMethod}] ${classMethodTitle} ${handleCostTime}ms`);
          this.logService.logAction({ classMethod, classMethodTitle, handleCostTime, handleErrorMsg: err.response });

          return throwError(() => err);
        }),
      );
  }
}

export const ExtendsLog = () => UseInterceptors(LogInterceptor);
