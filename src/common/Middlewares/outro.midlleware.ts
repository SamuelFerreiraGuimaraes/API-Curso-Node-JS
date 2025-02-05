import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

// Interceptor para medir o tempo de execução de uma requisição

@Injectable()
export class TimeConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // Marca o início da execução do interceptor
    const inicioInterceptor = Date.now();
    console.log('Interceptor (TimeConnectionInterceptor) iniciado');

    // Simula um atraso de 3 segundos (opcional)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Continua o fluxo da requisição e mede o tempo de execução
    return next.handle().pipe(
      tap(() => {
        // Marca o fim da execução do interceptor
        const fimInterceptor = Date.now();
        // Calcula o tempo decorrido
        const elapseInterceptor = fimInterceptor - inicioInterceptor;

        // Log do tempo de execução
        console.log(
          'Interceptor (TimeConnectionInterceptor) executado, duração de: ' +
            elapseInterceptor +
            'ms',
        );
      }),
    );
  }
}
