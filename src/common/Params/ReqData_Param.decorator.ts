import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Decorador personalizado para obter dados específicos da requisição HTTP
export const ReqDataParam = createParamDecorator(
  (data: keyof Request, ctx: ExecutionContext) => {
    // Obtém o contexto HTTP da requisição
    const context = ctx.switchToHttp();
    // Obtém o objeto de requisição HTTP
    const request: Request = context.getRequest();
    // Retorna o dado específico da requisição baseado na chave fornecida
    return request[data];
  },
);
