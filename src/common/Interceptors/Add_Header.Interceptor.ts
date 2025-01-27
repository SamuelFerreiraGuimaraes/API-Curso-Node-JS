import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// Isso aqui é bem inutil
@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(
      'Interceptor (AddHeaderInterceptor) no X-Custom-Header executado',
    );
    const response = context.switchToHttp().getResponse();

    response.setHeader('X-Custom-Header', 'O valor do cabeçalho');

    return next.handle();
  }
}
