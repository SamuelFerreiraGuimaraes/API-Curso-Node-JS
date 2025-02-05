import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Decorador personalizado para obter a URL da requisição HTTP
export const UrlParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Obtém o contexto HTTP da requisição
    const context = ctx.switchToHttp();
    // Obtém o objeto de requisição HTTP
    const request: Request = context.getRequest();
    // Retorna a URL da requisição
    return request.url;
  },
);
