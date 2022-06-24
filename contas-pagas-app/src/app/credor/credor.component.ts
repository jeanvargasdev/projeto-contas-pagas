import { Component, OnInit } from '@angular/core';
import { Credor } from '../model/credor';
import { DataStorage } from '../util/DataStorage';
import { CredorService } from '../services/credor.service';
import { ApiService } from './../services/api.service';
import { catchError } from 'rxjs/operators';

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

  constructor(private credorService: CredorService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.credor = new Credor('', '', 0);
    DataStorage.initDataStorage(this.entidade);

    this.getListCredoresService();
  }

  onSubmit() {
    this.credor.id = this.listaCredores.length + 1;
    this.saveCredor(this.credor);
  }

  saveCredor(credor: Credor) {
    if (this.sourceDataWS) {
      this.apiService.saveItemObs(this.credor, this.entidade).subscribe(v => {
        alert('cadastrei o credor com a api corretamente com observable...');
        this.getListCredores();
      });
    }
    else {
      //alert('erro ao cadastrar o credor... vou salvar no storage');
      this.credorService.salvar(this.credor);
      this.getListCredores();
    };


    // if (this.sourceDataWS) {
    //   this.apiService
    //     .saveItem(this.credor, this.entidade)
    //     .then((ent) => {
    //       alert('cadastrei o credor com a api corretamente...');
    //       this.getListCredores();
    //     });
    // }
    // else {
    //   //alert('erro ao cadastrar o credor... vou salvar no storage');
    //   this.credorService.salvar(this.credor);
    //   this.getListCredores();
    // };
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

