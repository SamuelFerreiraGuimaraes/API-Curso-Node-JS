import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

// Interceptor para manipulação de erros

@Injectable()
export class ErroHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // Log para indicar que o interceptor foi executado
    console.log('Interceptor (ErroHandlingInterceptor) executado');

    // Continua o fluxo da requisição e captura erros
    return next.handle().pipe(
      catchError((error) => {
        // Log do nome e mensagem do erro
        console.log(error.name);
        console.log(error.message);
        console.log('teste de erro');

        // Lança uma exceção de BadRequestException se o erro for NotFoundException
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.message);
          }
          // Re-lança o erro original se não for NotFoundException
          return error;
        });
      }),
    );
  }
}
