import { Injectable } from '@angular/core';
import { CryptoService } from '../crypto-service/crypto.service';
import { ColumnColor } from './../../models/interfaces/interfaces-board';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private cryptoService: CryptoService) {}

  public saveInLocalStorage(key: string, value: string) {
    //const cryptoData = this.cryptoService.getCryptoString(value);
    localStorage.setItem(key, value);
  }

  public getFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    if (data) {
      return data;
    }
    return new Error(`Key - ${key} - is not founded`);
  }

  public remoteFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  public saveColorCulumnLocalStorage(colorColumn: ColumnColor) {
    const colorData = JSON.stringify(colorColumn);
    localStorage.setItem('colorColumn', colorData);
  }
  //JSON.parse() don't work with PlainData -format-cryptoService

  public getColorCulumnLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
}
