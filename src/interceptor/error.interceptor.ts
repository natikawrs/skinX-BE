import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const res = context.switchToHttp().getResponse();
        if (err instanceof HttpException) {
          res.status(err.getStatus());
        } else {
          res.status(500);
        }
        res.json({
          message: err.message,
        });
        return throwError(() => {
          throw err;
        });
      }),
    );
  }
}
