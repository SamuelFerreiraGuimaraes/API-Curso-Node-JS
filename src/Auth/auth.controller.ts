import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './DTO/login.dto';
import { RefreshTokenDto } from './DTO/refresh.dto';

@Controller('AUTH')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('REFRESH')
  refreshTokens(@Body() RefreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(RefreshTokenDto);
  }
}
