import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

// Isso aqui é bem inutil
@Injectable()
export class TimeConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const inicioInterceptor = Date.now();
    console.log('Interceptor (TimeConnectionInterceptor) iniciado');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return next.handle().pipe(
      tap(() => {
        const fimInterceptor = Date.now();
        const elapseInterceptor = fimInterceptor - inicioInterceptor;

        console.log(
          'Interceptor (TimeConnectionInterceptor) executado, duração de: ' +
            elapseInterceptor,
        );
      }),
    );
  }
}
