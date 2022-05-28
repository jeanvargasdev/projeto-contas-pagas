import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conta } from '../model/conta';
import { Credor } from '../model/credor';
import { Lancamento } from '../model/lancamento';
import { DataStorage } from '../util/DataStorage';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  parametro: string = '';

  lancamento!: Lancamento;
  listaLancamentos!: Lancamento[];
  entidade: string = "lancamentos";
  listaContas: Conta[] = [];
  listaCredores: Credor[] = [];
  conta!: Conta;
  credor!: Credor;
  idconta!: number;
  idcredor!: number;
  frmPagamento!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.lancamento = new Lancamento(0, new Conta(0, ''), 0, new Date(), new Credor('', '', 0), '');
    DataStorage.initDataStorage(this.entidade);
    this.listaLancamentos = this.getListLancamentos();
    this.listaContas = this.getList('contas');
    this.listaCredores = this.getList('credores');

    // this.route.params.subscribe(param => {
    //   console.log(param);
    //   if (param['id'] === '1')
    //     window.alert("Rota com o valor 1");

    //   this.parametro = 'Valor do parametro da rota é : ' + param['id'];
    // })
  }

  onSubmit() {
    this.lancamento.id = this.getListLancamentos().length + 1;
    this.saveLancamento(this.lancamento);
    this.listaLancamentos = this.getListLancamentos();
  }

  saveLancamento(lancamento: Lancamento) {
    //salva no storage
    this.listaLancamentos = DataStorage.getList(this.entidade);

    //adiciona na lista
    this.listaLancamentos.push(lancamento);

    //salva no Data Storage
    DataStorage.saveItem(this.entidade, this.listaLancamentos);
  }

  getListLancamentos() {
    this.listaLancamentos = DataStorage.getList(this.entidade);
    return this.listaLancamentos;
  }

  //retorna uma lista já cadastrada no storage
  getList(entidade: string) {
    return DataStorage.getList(entidade);
  }

  onSelectChangeConta(event: Event) {
    this.idconta = +(event.target as HTMLInputElement).value;
    const cc = this.listaContas.find((c) => {
      return c.id === this.idconta;
    });

    this.conta = cc as Conta;
    console.log('conta: ', this.conta);
    this.lancamento.conta = this.conta;
  }

  onSelectChangeCredor(event: Event) {
    this.idcredor = +(event.target as HTMLInputElement).value;
    const cc = this.listaCredores.find((c) => {
      return c.id === this.idcredor;
    });

    this.credor = cc as Credor;
    console.log('credor: ', this.credor);
    this.lancamento.credor = this.credor;
  }

  onSelectChangeFrmPagamento(event: Event) {
    let frmPgto = +(event.target as HTMLInputElement).value;
    switch (frmPgto) {
      case 0: this.frmPagamento = 'Dinheiro'; break;
      case 1: this.frmPagamento = 'Cartão Crédito Nubanck'; break;
      case 2: this.frmPagamento = 'Cartão Crédito Santander'; break;
      case 3: this.frmPagamento = 'Cartão Débito Nubanck'; break;
      case 4: this.frmPagamento = 'Cartão Débito Santander'; break;
      case 5: this.frmPagamento = 'PIX'; break;
    }
    console.log('forma pagar: ', this.frmPagamento);
    this.lancamento.frmPagamento = this.frmPagamento;
  }
}
