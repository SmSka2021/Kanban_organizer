import { Injectable } from '@angular/core';
import SimpleCrypto, { PlainData } from 'simple-crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private secretKey = 'some-super-secret-key';

  private simpleCrypto = new SimpleCrypto(this.secretKey);

  public getCryptoString(item: string): string {
    return this.simpleCrypto.encrypt(item);
  }

  public getDecryptedString(item: string): PlainData {
    return this.simpleCrypto.decrypt(item);
  }
}
