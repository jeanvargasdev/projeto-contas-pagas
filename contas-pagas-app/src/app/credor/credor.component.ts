import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Credor } from '../model/credor';
import { DataStorage } from '../util/DataStorage';
import { CredorService } from '../services/credor.service';
import { ApiService } from './../services/api.service';
import { Util } from '../util/util';


@Component({
  selector: 'app-credor',
  templateUrl: './credor.component.html',
  styleUrls: ['./credor.component.css']
})
export class CredorComponent implements OnInit {
  credor!: Credor;
  listaCredores!: Credor[];
  entidade: string = "credores";
  sourceDataWS: boolean = false;
  jaEntrouDataWS: boolean = false;
  messageData: string = '';
  isEdicao: boolean = false;

  constructor(private credorService: CredorService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.novoCredor();
    DataStorage.initDataStorage(this.entidade);

    this.getListCredoresService();
  }

  novoCredor() {
    this.credor = new Credor('', '', 0);
  }

  onSubmit() {
    if (!this.isEdicao && !this.sourceDataWS)
      ///caso esteja utilizando o localstorage, retorna id para a coleção
      //não é utilizado para json server
      this.credor.id = Util.retornaId(this.listaCredores) + 1;
    this.saveCredor(this.credor);
  }

  saveCredor(credor: Credor) {
    if (this.sourceDataWS) {
      if (!this.isEdicao) {
        this.apiService.saveItemObs(this.credor, this.entidade).subscribe(v => {
          //alert('cadastrei o credor com a api corretamente com observable...');
          this.getListCredores();
        });
      }
      else {
        this.apiService.updateItemObs(this.credor, this.entidade).subscribe(v => {
          v.id = credor.id;
          //alert('atualizei o credor com a api corretamente com observable...');
          this.getListCredores();
        });
      }
    }
    else {
      if (this.isEdicao)
        this.credorService.atualizar(this.credor)
      else
        this.credorService.salvar(this.credor);
      this.getListCredores();
    };
    this.isEdicao = false;
    this.novoCredor();
  }

  getListCredores() {
    if (this.sourceDataWS)
      this.getListCredoresService();
    else {
      this.listaCredores = DataStorage.getList(this.entidade);
      this.messageData = 'ORIGEM DOS DADOS: WEBSTORAGE'
    }
  }

  getListCredoresService() {
    this.apiService.getItemsObs(this.entidade).subscribe(response => {
      this.listaCredores = response.map(item => {
        return new Credor(
          item.nome,
          item.descricao,
          item.id
        );
      });
      this.sourceDataWS = true;
      this.messageData = 'ORIGEM DOS DADOS: JSON SERVER'
    });

    if (this.sourceDataWS != true) {
      this.sourceDataWS = false;
      this.getListCredores();
    }
  }

  editCredor(credor: Credor) {
    let vCloneCredor = Util.clonar(credor, this.entidade);
    this.credor = vCloneCredor;
    this.isEdicao = true;
  }

<<<<<<< HEAD
  editCredor(credor: Credor) {
    alert('ok:' + credor.nome);
  }

  // this.apiService.getItems(this.entidade)
  //   .then((lst) => {
  //     this.listaCredores = lst as Credor[];
  //     this.sourceDataWS = true;
  //     this.messageData = 'ORIGEM DOS DADOS: JSON SERVER'
  //   }).catch((er) => {
  //     this.sourceDataWS = false;
  //     this.getListCredores()
  //   });
}
=======
  removeCredor(credor: Credor) {
    let result = Util.confirmar(credor);
>>>>>>> feature/projeto-final

    if (result) {
      if (!this.sourceDataWS) {
        this.credorService.remover(credor);
        this.getListCredores();
      }
      else {
        this.apiService.removeItemObs(credor, this.entidade).subscribe(response => {
          this.listaCredores = this.listaCredores.filter(item => {
            item.id !== credor.id;
          });
          this.getListCredores();
        });
      }
    }
  }
}
