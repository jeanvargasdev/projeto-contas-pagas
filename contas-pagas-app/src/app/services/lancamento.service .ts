
import { Injectable } from '@angular/core';
import { DataStorage } from '../util/DataStorage';
import { Lancamento } from '../model/lancamento';
import { BehaviorSubject, Observable } from 'rxjs';
import { getLocaleId } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  lancamentos!: Lancamento[];
  classe: string = 'lancamentos';
  private totalizador!: BehaviorSubject<number>;
  totalLancamentos: number = 0;

  constructor() {
    this.lancamentos = DataStorage.getList(this.classe);
    this.totalizador = new BehaviorSubject<number>(this.totalLancamentos);
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

  getTotalValorLancamento(lista: Lancamento[]) {
    //let lista = this.lista();
    let vAtual: number = 0;
    lista.forEach(c => vAtual = vAtual + c.valor);
    this.totalLancamentos = vAtual;
    return this.totalLancamentos;
  }

  notifyTotal(lista: Lancamento[]) {
    this.totalizador.next(this.getTotalValorLancamento(lista));
  }

  asObservable(): Observable<number> {
    return this.totalizador;
  }
}

