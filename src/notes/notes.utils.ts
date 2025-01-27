import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesUtils {
  inverteString(str: string) {
    // Samuel -> leumaS
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
