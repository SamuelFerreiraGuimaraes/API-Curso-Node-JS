import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // Log para indicar que o interceptor foi executado
    console.log('Interceptor (AuthTokenInterceptor) executado');

    // Obtém o objeto de requisição HTTP
    const request = context.switchToHttp().getRequest();
    // Obtém o token de autorização do cabeçalho da requisição
    const token = request.headers.authorization?.split(' ')[1];

    // Verifica se o token está presente e se é válido
    if (!token || token != '123456') {
      // Lança uma exceção de não autorizado se o token for inválido ou ausente
      throw new UnauthorizedException('Usuário não logado');
    }

    // Continua o fluxo da requisição
    return next.handle();
  }
}
