import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// Filtro de exceção para capturar erros e retornar uma resposta mais amigável

// Decorador @Catch(HttpException) indica que este filtro irá capturar todas as exceções do tipo HttpException
@Catch(HttpException)
export class MyExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  // Método 'catch' que será executado quando uma exceção for capturada
  catch(exception: T, host: ArgumentsHost) {
    // Obtém o contexto HTTP da requisição
    const context = host.switchToHttp();
    // Obtém o objeto de resposta HTTP
    const response = context.getResponse();
    // Obtém o objeto de requisição HTTP
    const request = context.getRequest();

    // Obtém o status da exceção
    const statusCode = exception.getStatus();
    // Obtém a resposta da exceção
    const exceptionResponse = exception.getResponse();

    // Define a estrutura do erro a ser retornado
    const error =
      typeof response === 'string'
        ? {
            message: exceptionResponse,
          }
        : (exceptionResponse as object);

    // Envia a resposta HTTP com o status e o corpo da resposta
    response.status(statusCode).json({
      ...error, // Inclui a resposta da exceção
      timestamp: new Date().toISOString(), // Adiciona a data e hora atual
      path: request.url, // Adiciona a URL da requisição
    });
  }
}
