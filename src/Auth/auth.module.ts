import { Global, Module } from '@nestjs/common';
import { HashServiceProtocol } from './Hashing/hashing.service';
import { BcryptService } from './Hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Pessoa]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashServiceProtocol,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashServiceProtocol, JwtModule, ConfigModule],
})
export class AuthModule {}
