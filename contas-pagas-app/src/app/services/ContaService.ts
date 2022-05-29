
import { Injectable } from '@angular/core';
import { DataStorage } from '../util/DataStorage';
import { Conta } from './../model/conta';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  contas!: Conta[];
  classe: string = 'contas';

  constructor() {
    this.contas = DataStorage.getList(this.classe);
  }

  salvar(conta: Conta) {
    this.contas = this.lista();
    this.contas.push(conta);
    DataStorage.saveItem(this.classe, this.contas);
    console.log(this.contas);
  }

  lista(): Conta[] {
    this.contas = DataStorage.getList(this.classe);
    return this.contas;
  }
}

