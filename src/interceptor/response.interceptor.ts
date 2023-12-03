import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, map, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(() => {
          throw err;
        });
      }),
      map((data) => {
        const res = context.switchToHttp().getResponse();
        res.json({
          data,
        });
      }),
    );
  }
}
