import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Log para indicar que o pipe de transformação foi executado
    console.log('Pipe de transformação foi executado');

    // Verifica se o metadado é do tipo 'param' e se o dado é 'id'
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    // Converte o valor para número
    const parsedValue = Number(value);

    // Lança uma exceção de BadRequestException se o valor não for um número
    if (isNaN(parsedValue)) {
      throw new BadRequestException('Espera-se um valor numérico para buscar');
    }

    // Lança uma exceção de BadRequestException se o valor for negativo
    if (parsedValue < 0) {
      throw new BadRequestException('Espera-se um número positivo para buscar');
    }

    // Retorna o valor convertido
    return parsedValue;
  }
}
