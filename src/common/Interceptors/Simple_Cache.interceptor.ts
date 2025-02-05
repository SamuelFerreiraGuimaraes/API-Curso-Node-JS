import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of, tap } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  // Mapa para armazenar o cache das respostas
  private readonly cache = new Map();

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // Log para indicar que o interceptor foi executado antes da manipulação da requisição
    console.log('SimpleCacheInterceptor executado ANTES');

    // Obtém o objeto de requisição HTTP
    const request = context.switchToHttp().getRequest();
    // Obtém a URL da requisição
    const url = request.url;

    // Verifica se a resposta para a URL está no cache
    if (this.cache.has(url)) {
      console.log('Está no cache', url);
      // Retorna a resposta do cache
      return of(this.cache.get(url));
    }

    // Simula um atraso de 3 segundos (opcional)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Continua o fluxo da requisição e armazena a resposta no cache
    return next.handle().pipe(
      tap((data) => {
        this.cache.set(url, data);
        console.log('Armazenado em cache', url);
      }),
    );
  }
}
