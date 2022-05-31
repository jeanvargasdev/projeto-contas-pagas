
import { Injectable } from '@angular/core';
import { Credor } from '../model/credor';
import { DataStorage } from '../util/DataStorage';

@Injectable({
  providedIn: 'root',
})
export class CredorService {
  credores!: Credor[];
  classe: string = 'credores';

  constructor() {
    this.credores = DataStorage.getList(this.classe);
  }

  salvar(credor: Credor) {
    this.credores = this.lista();
    this.credores.push(credor);
    DataStorage.saveItem(this.classe, this.credores);
  }

  lista(): Credor[] {
    this.credores = DataStorage.getList(this.classe);
    return this.credores;
  }
}

