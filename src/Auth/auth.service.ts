import { Injectable } from '@nestjs/common';
import { LoginDTO } from './DTO/login.dto';

@Injectable()
export class AuthService {
  async login(loginDTO: LoginDTO) {
    return loginDTO;
  }
}
