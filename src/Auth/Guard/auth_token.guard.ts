import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      return false;
    }

    const [bearer, tokenValue] = token.split(' ');

    if (bearer !== 'Bearer' || !tokenValue) {
      return false;
    }

    request['token'] = tokenValue;

    return true;
  }
}
