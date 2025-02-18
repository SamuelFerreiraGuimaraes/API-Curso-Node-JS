import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.const';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConnfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Login não realizado');
    }

    try {
      const payloaad = await this.jwtService.verifyAsync(
        token,
        this.jwtConnfiguration,
      );

      request[REQUEST_TOKEN_PAYLOAD_KEY] = payloaad;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers?.['authorization'];
    if (!authorization || typeof authorization !== 'string') {
      return;
    }
    return authorization.split(' ')[1];
  }
}
