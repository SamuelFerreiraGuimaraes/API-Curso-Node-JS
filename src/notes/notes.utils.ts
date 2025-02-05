// Criado para utilizar o protocolo de regex
// caso queira utilizar o protocolo de regex, descomente a parte do código
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesUtils {
  inverteString(str: string) {
    console.log('NÃO É MOCK');
    return str.split('').reverse().join('');
  }
}

@Injectable()
export class NotesUtilsMock {
  inverteString() {
    console.log('Passei no MOCK');
    return 'bla bla bla';
  }
}
