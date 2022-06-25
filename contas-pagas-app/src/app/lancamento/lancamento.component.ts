import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Conta } from '../model/conta';
import { Credor } from '../model/credor';
import { Lancamento } from '../model/lancamento';
import { ApiService } from '../services/api.service';
import { ContaService } from '../services/Conta.service';
import { CredorService } from '../services/credor.service';
import { DataStorage } from '../util/DataStorage';
import { LancamentoService } from './../services/lancamento.service ';
import { Util } from '../util/util';

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
  totalValorLancamento: number = 0;
  i: number = 0;
  subscription: Subscription;
  isEdicao: boolean = false;

  constructor(private route: ActivatedRoute, private credorService: CredorService,
    private contaService: ContaService, private apiService: ApiService, private LancamentoService: LancamentoService) {

    this.subscription = this.LancamentoService.asObservable().subscribe(
      (data) => {
        this.totalValorLancamento = data;
      },
      (error) => {
        alert("Erro ao atualizaro totalizador de valores para lançamentos")
      }
    );
  }

  novoLancamento() {
    this.lancamento = new Lancamento(0, new Conta(0, ''), 0, new Date(), new Credor('', '', 0), '');
  }

  ngOnInit(): void {
    this.novoLancamento();
    DataStorage.initDataStorage(this.entidade);
    this.i = 0;
    this.getListService('lancamentos');
    this.getListService('contas');
    this.getListService('credores');
    this.totalValorLancamento = this.LancamentoService.getTotalValorLancamento(this.listaLancamentos);
  }

  onSubmit() {
    if (!this.isEdicao && !this.sourceDataWS)
      this.lancamento.id = Util.retornaId(this.listaLancamentos) + 1;

    if (this.lancamento.valor === 0) {
      alert("Valor precisa ser maior que zero");
      return;
    }

    this.saveLancamento(this.lancamento);
  }

  saveLancamento(lancamento: Lancamento) {
    if (this.sourceDataWS) {
      if (!this.isEdicao) {
        this.apiService
          .saveItem(this.lancamento, this.entidade)
          .then((ent) => {
            //alert('cadastrei o lancamento com a api corretamente...');
            //this.getListLancamentos();
            this.getList('lancamentos');
            this.LancamentoService.notifyTotal(this.listaLancamentos);
          });
      } else {
        this.apiService.updateItemObs(this.lancamento, this.entidade).subscribe(v => {
          v.id = lancamento.id;
          alert('atualizei o credor com a api corretamente com observable...');
          this.getList('lancamentos');
        });
      }
    } else {
      if (this.isEdicao) {
        this.LancamentoService.atualizar(this.lancamento);
        this.LancamentoService.notifyTotal(this.listaLancamentos);
      }
      else {
        // //salva no storage
        this.listaLancamentos = DataStorage.getList(this.entidade);

        //adiciona na lista
        this.listaLancamentos.push(lancamento);

        //salva no Data Storage
        DataStorage.saveItem(this.entidade, this.listaLancamentos);
        //this.getListLancamentos();
        this.getList('lancamentos');

        this.LancamentoService.notifyTotal(this.listaLancamentos);
      };
    }

    this.isEdicao = false;
    //this.novoLancamento();
  }

  getListService(entidade: string) {
    if (this.i == 0) {
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
          this.LancamentoService.notifyTotal(this.listaLancamentos);
        }).catch((er) => {
          this.sourceDataWS = false;
          this.i = 1;
          this.getList(entidade);
        });
    } else {
      this.sourceDataWS = false;
      this.i = 1;
      this.getList(entidade);
    }
  }


  //retorna uma lista já cadastrada no storage ou service
  getList(entidade: string) {
    if (this.sourceDataWS)
      this.getListService(entidade);
    else {
      if (entidade == 'contas')
        this.listaContas = DataStorage.getList(entidade);
      else if (entidade == 'credores')
        this.listaCredores = DataStorage.getList(entidade);
      else
        this.listaLancamentos = DataStorage.getList(entidade);

      this.messageData = 'ORIGEM DOS DADOS: WEBSTORAGE'
      this.LancamentoService.notifyTotal(this.listaLancamentos);
    };
  }

  onSelectChangeConta(event: Event) {
    this.idconta = +(event.target as HTMLInputElement).value;
    const cc = this.listaContas.find((c) => {
      return c.id === this.idconta;
    });

    this.conta = cc as Conta;
    this.lancamento.conta = this.conta;
  }

  onSelectChangeCredor(event: Event) {
    this.idcredor = +(event.target as HTMLInputElement).value;
    const cc = this.listaCredores.find((c) => {
      return c.id === this.idcredor;
    });

    this.credor = cc as Credor;
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
    this.lancamento.frmPagamento = this.frmPagamento;
  }

  editLancamento(lancamento: Lancamento) {
    let vCloneLancamento = Util.clonar(lancamento, this.entidade);
    this.credor = vCloneLancamento;
    //this.isEdicao = true;
  }

  removeLancamento(lancamento: Lancamento) {
    let result = Util.confirmar(lancamento);

    if (result) {
      if (!this.sourceDataWS) {
        this.LancamentoService.remover(lancamento);
        this.getList('lancamentos');
      }
      else {
        this.apiService.removeItemObs(lancamento, this.entidade).subscribe(response => {
          this.listaLancamentos = this.listaLancamentos.filter(item => {
            item.id !== lancamento.id;
          });
          this.getList('lancamentos');
        });
      }
    }
  }
}
