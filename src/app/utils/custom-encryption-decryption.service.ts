import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CustomEncryptionDecryptionService {secretKey = "base64:OgIVDjO0Bn7tqbSvxxBfNERaazsqsseT+xFqlBalgH/ks=&Descryption";
  constructor() {
  }
  encrypt(value: any) {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
  decrypt(textToDecrypt: any) {
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
