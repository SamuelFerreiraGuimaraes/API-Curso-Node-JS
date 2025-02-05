import { Injectable } from '@nestjs/common';

// Função para retornar uma string de teste
@Injectable()
export class AppService {
  getHello(): string {
    return 'Olá Mundo!';
  }
}
