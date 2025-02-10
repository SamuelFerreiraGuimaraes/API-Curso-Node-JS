import { Global, Module } from '@nestjs/common';
import { HashServiceProtocol } from './Hashing/hashing.service';
import { BcryptService } from './Hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: HashServiceProtocol,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashServiceProtocol],
})
export class AuthModule {}
