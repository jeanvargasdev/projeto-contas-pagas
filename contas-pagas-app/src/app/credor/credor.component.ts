import { Component, OnInit } from '@angular/core';
import { Credor } from '../model/credor';
import { DataStorage } from '../util/DataStorage';
import { CredorService } from './../services/CredorService';

@Component({
  selector: 'app-credor',
  templateUrl: './credor.component.html',
  styleUrls: ['./credor.component.css']
})
export class CredorComponent implements OnInit {
  credor!: Credor;
  listaCredores!: Credor[];
  entidade: string = "credores";

  constructor(private credorService: CredorService) { }

  ngOnInit(): void {
    this.credor = new Credor('', '', 0);
    DataStorage.initDataStorage(this.entidade);
    this.listaCredores = this.getListCredores();
  }

  onSubmit() {
    this.credor.id = this.getListCredores().length + 1;
    this.credorService.salvar(this.credor);
    this.listaCredores = this.credorService.lista();
    //this.saveCredor(this.credor);
    //this.listaCredores = this.getListCredores();
  }

  saveCredor(credor: Credor) {
    //salva no storage
    this.listaCredores = DataStorage.getList(this.entidade);

    //adiciona na lista
    this.listaCredores.push(credor);

    //salva no Data Storage
    DataStorage.saveItem(this.entidade, this.listaCredores);
  }

  getListCredores() {
    this.listaCredores = DataStorage.getList(this.entidade);
    return this.listaCredores;
  }
}
