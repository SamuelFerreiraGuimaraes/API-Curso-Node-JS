// Importações necessárias do framework NestJS
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

// EXCEPTION FILTER - Filtro de exceção para capturar erros
// e retornar uma resposta mais amigável

// Decorador @Catch(Error) indica que este filtro irá capturar todas as exceções do tipo Error
@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  // Método 'catch' que será executado quando uma exceção for capturada
  catch(exception: any, host: ArgumentsHost) {
    // Obtém o contexto HTTP da requisição
    const context = host.switchToHttp();

    // Obtém o objeto de resposta HTTP
    const response = context.getResponse();
    // Obtém o objeto de requisição HTTP
    const request = context.getRequest();

    // Obtém o status da exceção, se disponível, ou define como 400 (Bad Request)
    const statusCode = exception.getStatus ? exception.getStatus() : 400;
    // Obtém a resposta da exceção, se disponível, ou define uma resposta padrão
    const exceptionResponse = exception.getResponse
      ? exception.getResponse()
      : { message: 'Error', statusCode };

    // Envia a resposta HTTP com o status e o corpo da resposta
    response.status(statusCode).json({
      ...exceptionResponse, // Inclui a resposta da exceção
      data: new Date().toISOString(), // Adiciona a data e hora atual
      path: request.url, // Adiciona a URL da requisição
    });
  }
}
