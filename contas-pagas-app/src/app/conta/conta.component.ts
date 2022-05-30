import { Component, OnInit } from '@angular/core';
import { Conta } from '../model/conta';
import { ApiService } from '../services/api.service';
import { ContaService } from '../services/Conta.service';
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
  sourceDataWS: boolean = false;
  messageData: string = '';

  constructor(private contaService: ContaService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.conta = new Conta(0, '');
    DataStorage.initDataStorage(this.entidade);
    this.getListContas();
  }

  onSubmit() {
    this.conta.id = this.listaContas.length + 1;
    this.saveConta(this.conta);
  }

  saveConta(conta: Conta) {
    this.apiService
      .saveItem(this.conta, this.entidade)
      .then((ent) => {
        alert('cadastrei a conta na api corretamente...');
        this.getListContas();
      })
      .catch((er) => {
        alert('erro ao cadastrar a conta... vou salvar no storage');
        this.contaService.salvar(this.conta);
        this.getListContas();
      });
  }

  getListContas() {
    this.apiService.getItems(this.entidade)
      .then((lst) => {
        this.listaContas = lst as Conta[];
        this.sourceDataWS = true;
        this.messageData = 'ORIGEM DOS DADOS: JSON SERVER'
      })
      .catch((er) => {
        this.listaContas = DataStorage.getList(this.entidade);
        this.sourceDataWS = true;
        this.messageData = 'ORIGEM DOS DADOS: WEBSTORAGE'
      });
  }
}
