import { NestMiddleware, BadRequestException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Log para indicar que o middleware foi executado
    console.log('SimpleMiddleware: Olá');

    // Obtém o cabeçalho de autorização da requisição
    const authorization = req.headers?.authorization;

    // Se o cabeçalho de autorização estiver presente, adiciona um objeto 'user' à requisição
    if (authorization) {
      req['user'] = {
        nome: 'Samuel',
        sobrenome: 'Fereira',
        role: 'admin',
      };
    }

    // Lança uma exceção de BadRequestException se o cabeçalho de autorização estiver presente
    if (authorization) {
      throw new BadRequestException('Bla bla');
    }

    // Adiciona um cabeçalho personalizado à resposta HTTP
    res.setHeader('CABECALHO', 'Do Middleware');

    // Termina a cadeia de chamadas e envia uma resposta 404 (Not Found)
    // Se essa linha for descomentada, a próxima função middleware não será chamada
    /* return res.status(404).send({
      message: 'Não encontrado',
    }); */

    // Chama a próxima função middleware na cadeia
    next();

    // Log para indicar que o middleware foi finalizado
    console.log('SimpleMiddleware: Tchau');

    // Log quando a resposta for finalizada
    res.on('finish', () => {
      console.log('SimpleMiddleware: Terminou');
    });
  }
}
