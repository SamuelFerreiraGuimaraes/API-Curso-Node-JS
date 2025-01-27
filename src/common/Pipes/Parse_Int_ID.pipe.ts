import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Pipe de transformação foi executado');

    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      throw new BadRequestException('Espera-se um valor numerico para buscar');
    }

    if (parsedValue < 0) {
      throw new BadRequestException('espera-se um numero para se buscar');
    }

    return parsedValue;
  }
}
