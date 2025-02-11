import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './DTO/login.dto';
import { Repository } from 'typeorm';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashServiceProtocol } from './Hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepository: Repository<Pessoa>,
    private readonly hashService: HashServiceProtocol,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {
    console.log(jwtConfiguration);
  }

  async login(loginDTO: LoginDTO) {
    let passwordValida = false;
    let throwError = true;

    const pessoa = await this.pessoasRepository.findOneBy({
      email: loginDTO.email,
    });

    if (pessoa) {
      passwordValida = await this.hashService.comparePassword(
        loginDTO.password,
        pessoa.PassHash,
      );
    }

    if (passwordValida) {
      throwError = false;
    }

    if (throwError) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const tokenacesso = await this.jwtService.signAsync(
      {
        sub: pessoa.id,
        email: pessoa.email,
        senha: pessoa.password,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwttl,
      },
    );

    return {
      tokenacesso,
    };
  }
}
