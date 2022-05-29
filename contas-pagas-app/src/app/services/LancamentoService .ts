
import { Injectable } from '@angular/core';
import { DataStorage } from '../util/DataStorage';
import { Conta } from '../model/conta';
import { Lancamento } from '../model/lancamento';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  lancamentos!: Lancamento[];
  classe: string = 'lancamentos';

  constructor() {
    this.lancamentos = DataStorage.getList(this.classe);
  }

  salvar(lancamento: Lancamento) {
    this.lancamentos = this.lista();
    this.lancamentos.push(lancamento);
    DataStorage.saveItem(this.classe, this.lancamentos);
    console.log(this.lancamentos);
  }

  lista(): Lancamento[] {
    this.lancamentos = DataStorage.getList(this.classe);
    return this.lancamentos;
  }
}

