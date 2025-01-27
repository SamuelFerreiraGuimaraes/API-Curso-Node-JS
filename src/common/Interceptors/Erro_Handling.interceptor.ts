import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

// Isso aqui é bem inutil
@Injectable()
export class ErroHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('Interceptor (ErroHandlingInterceptor) executado');

    return next.handle().pipe(
      catchError((error) => {
        console.log(error.name);
        console.log(error.messagem);
        console.log('teste de erro');
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.messagem);
          }
        });
      }),
    );
  }
}
