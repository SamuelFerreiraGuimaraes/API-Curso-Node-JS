import { RegExProtocol } from './regex.protocol';

export class RemoveSpacesRegex extends RegExProtocol {
  execute(str: string): string {
    return str.replace(/\s/g, '');
  }
}
