import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conta } from '../model/conta';
import { Credor } from '../model/credor';
import { Lancamento } from '../model/lancamento';
import { ApiService } from '../services/api.service';
import { ContaService } from '../services/Conta.service';
import { CredorService } from '../services/credor.service';
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
  sourceDataWS: boolean = false;
  messageData: string = '';

  constructor(private route: ActivatedRoute, private credorService: CredorService,
    private contaService: ContaService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.lancamento = new Lancamento(0, new Conta(0, ''), 0, new Date(), new Credor('', '', 0), '');
    DataStorage.initDataStorage(this.entidade);
    //this.getListLancamentos();
    this.getList('lancamentos');
    this.getList('contas');
    this.getList('credores');
  }

  onSubmit() {
    this.lancamento.id = this.listaLancamentos.length + 1;

    if (this.lancamento.valor === 0) {
      alert("Valor precisa ser maior que zero");
      return;
    }

    this.saveLancamento(this.lancamento);
  }

  saveLancamento(lancamento: Lancamento) {
    this.apiService
      .saveItem(this.lancamento, this.entidade)
      .then((ent) => {
        alert('cadastrei o lancamento com a api corretamente...');
        //this.getListLancamentos();
        this.getList('lancamentos');
      })
      .catch((er) => {
        alert('vou salvar o lançamento no storage....');
        // //salva no storage
        this.listaLancamentos = DataStorage.getList(this.entidade);

        //adiciona na lista
        this.listaLancamentos.push(lancamento);

        //salva no Data Storage
        DataStorage.saveItem(this.entidade, this.listaLancamentos);
        //this.getListLancamentos();
        this.getList('lancamentos');
      });
  }

  // getListLancamentos() {
  //   this.apiService.getItems(this.entidade)
  //     .then((lst) => {
  //       this.listaLancamentos = lst as Lancamento[];
  //       this.sourceDataWS = true;
  //       this.messageData = 'ORIGEM DOS DADOS: JSON SERVER'
  //     })
  //     .catch((er) => {
  //       this.listaLancamentos = DataStorage.getList(this.entidade);
  //       this.sourceDataWS = true;
  //       this.messageData = 'ORIGEM DOS DADOS: WEBSTORAGE'
  //     });
  // }

  //retorna uma lista já cadastrada no storage ou service
  getList(entidade: string) {
    this.apiService.getItems(entidade)
      .then((lst) => {
        if (entidade == 'contas')
          this.listaContas = lst as Conta[];
        else if (entidade == 'credores')
          this.listaCredores = lst as Credor[];
        else
          this.listaLancamentos = lst as Lancamento[];

        this.sourceDataWS = true;
        this.messageData = 'ORIGEM DOS DADOS: JSON SERVER'
      })
      .catch((er) => {
        if (entidade == 'contas')
          this.listaContas = DataStorage.getList(entidade);
        else if (entidade == 'credores')
          this.listaCredores = DataStorage.getList(entidade);
        else
          this.listaLancamentos = DataStorage.getList(entidade);

        this.sourceDataWS = true;
        this.messageData = 'ORIGEM DOS DADOS: WEBSTORAGE'
      });
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
