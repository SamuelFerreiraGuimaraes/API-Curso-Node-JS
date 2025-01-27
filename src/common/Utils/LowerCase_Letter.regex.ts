import { RegExProtocol } from './regex.protocol';

export class LowerCaseLetterRegex extends RegExProtocol {
  execute(str: string): string {
    return str.replace(/[^a-z]/g, '');
  }
}
