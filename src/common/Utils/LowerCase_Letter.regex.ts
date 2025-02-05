import { RegExProtocol } from './regex.protocol';

// Implementa o protocolo RegExProtocol para manipulação de letras minúsculas
export class LowerCaseLetterRegex extends RegExProtocol {
  // Implementa o método 'execute' definido no protocolo
  // Este método substitui todos os caracteres que não são letras minúsculas por uma string vazia
  execute(str: string): string {
    return str.replace(/[^a-z]/g, '');
  }
}
