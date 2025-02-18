import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.const';

export const TokenPayLoadParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();
    const request = context.getRequest();
    return request[REQUEST_TOKEN_PAYLOAD_KEY];
  },
);
