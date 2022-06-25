import { Component, OnInit } from '@angular/core';
import { Conta } from '../model/conta';
import { ApiService } from '../services/api.service';
import { ContaService } from '../services/Conta.service';
import { DataStorage } from '../util/DataStorage';
import { Util } from '../util/util';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  conta!: Conta;
  listaContas: Conta[] = [];
  entidade: string = "contas";
  sourceDataWS: boolean = false;
  messageData: string = '';
  isEdicao: boolean = false;

  constructor(private contaService: ContaService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.novaConta();
    DataStorage.initDataStorage(this.entidade);
    this.getListContasService();
  }


  novaConta() {
    this.conta = new Conta(0, '');;
  }

  onSubmit() {
    if (!this.isEdicao && !this.sourceDataWS)
      this.conta.id = Util.retornaId(this.listaContas) + 1;
    this.saveConta(this.conta);
  }

  saveConta(conta: Conta) {
    if (this.sourceDataWS) {
      if (!this.isEdicao) {
        this.apiService.saveItemObs(this.conta, this.entidade).subscribe(v => {
          alert('cadastrei a conta com a api corretamente com observable...');
          this.getListContas();
        });
      }
      else {
        this.apiService.updateItemObs(this.conta, this.entidade).subscribe(v => {
          v.id = conta.id;
          //alert('atualizei o credor com a api corretamente com observable...');
          this.getListContas();
        });
      }
    }
    else {
      if (this.isEdicao)
        this.contaService.atualizar(this.conta)
      else
        this.contaService.salvar(this.conta);

      this.getListContas();
    };

    this.isEdicao = false;
    this.novaConta();
  }

  getListContasService() {
    this.apiService.getItemsObs(this.entidade).subscribe(response => {
      this.listaContas = response.map(item => {
        return new Conta(
          item.id,
          item.tipo
        );
      });
      this.sourceDataWS = true;
      this.messageData = 'ORIGEM DOS DADOS: JSON SERVER'
    });

    if (this.sourceDataWS != true) {
      this.sourceDataWS = false;
      this.getListContas();
    }
  };

  getListContas() {
    if (this.sourceDataWS)
      this.getListContasService();
    else {
      this.listaContas = DataStorage.getList(this.entidade);
      this.messageData = 'ORIGEM DOS DADOS: WEBSTORAGE'
    }
  }

  editConta(conta: Conta) {
    let vCloneConta = Util.clonar(conta, this.entidade);
    this.conta = vCloneConta;
    this.isEdicao = true;
  }

  removeConta(conta: Conta) {
    let result = Util.confirmar(conta);

    if (result) {
      if (!this.sourceDataWS) {
        this.contaService.remover(conta);
        this.getListContas();
      }
      else {
        this.apiService.removeItemObs(conta, this.entidade).subscribe(response => {
          this.listaContas = this.listaContas.filter(item => {
            item.id !== conta.id;
          });
          this.getListContas();
        });
      }
    }
  }
}
