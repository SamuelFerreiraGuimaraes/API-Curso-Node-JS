import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// Interceptor para adicionar um cabeçalho personalizado à resposta HTTP

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Log para indicar que o interceptor foi executado
    console.log(
      'Interceptor (AddHeaderInterceptor) no X-Custom-Header executado',
    );

    // Obtém o objeto de resposta HTTP
    const response = context.switchToHttp().getResponse();

    // Adiciona um cabeçalho personalizado à resposta HTTP
    response.setHeader('X-Custom-Header', 'O valor do cabeçalho');

    // Continua o fluxo da requisição
    return next.handle();
  }
}
