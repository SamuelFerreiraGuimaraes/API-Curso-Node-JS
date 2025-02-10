import * as bcrypt from 'bcryptjs';
import { HashServiceProtocol } from './hashing.service';

export class BcryptService extends HashServiceProtocol {
  async hashPassword(password: string): Promise<string> {
    const slat = await bcrypt.genSalt();
    return bcrypt.hash(password, slat);
  }
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
