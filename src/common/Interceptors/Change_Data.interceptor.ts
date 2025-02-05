import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // Log para indicar que o interceptor foi executado
    console.log('Interceptor (ChangeDataInterceptor) executado');

    // Continua o fluxo da requisição e modifica a resposta
    return next.handle().pipe(
      map((data) => {
        // Se a resposta for um array, adiciona um campo 'count' com o número de itens
        if (Array.isArray(data)) {
          return {
            data,
            count: data.length,
          };
        }

        // Retorna a resposta original se não for um array
        return data;
      }),
    );
  }
}
