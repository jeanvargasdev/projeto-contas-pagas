import { Component, OnInit } from '@angular/core';
import { Conta } from '../model/conta';
import { DataStorage } from '../util/DataStorage';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  conta!: Conta;
  listaContas: Conta[] = [];
  entidade: string = "contas";

  constructor() { }

  ngOnInit(): void {
    this.conta = new Conta(0, '');
    DataStorage.initDataStorage(this.entidade);
    this.listaContas = this.getListContas();
  }

  onSubmit() {
    this.conta.id = this.getListContas().length + 1;
    this.saveConta(this.conta);
    this.listaContas = this.getListContas();
  }

  saveConta(conta: Conta) {
    //salva no storage
    this.listaContas = DataStorage.getList(this.entidade);

    //adiciona na lista
    this.listaContas.push(conta);

    //salva no Data Storage
    DataStorage.saveItem(this.entidade, this.listaContas);
  }

  getListContas() {
    this.listaContas = DataStorage.getList(this.entidade);
    return this.listaContas;
  }
}
