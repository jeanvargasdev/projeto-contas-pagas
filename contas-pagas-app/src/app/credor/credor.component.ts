import { Component, OnInit } from '@angular/core';
import { Credor } from '../model/credor';
import { DataStorage } from '../util/DataStorage';

@Component({
  selector: 'app-credor',
  templateUrl: './credor.component.html',
  styleUrls: ['./credor.component.css']
})
export class CredorComponent implements OnInit {

  nome: string = '';
  credor!: Credor;
  listaCredores!: Credor[];
  entidade: string = "credores";

  constructor() { }

  ngOnInit(): void {
    this.listaCredores = [];
    this.credor = new Credor('', '');
    DataStorage.initDataStorage(this.entidade);
  }

  onSubmit() {
    //console.log(`O nome é: ${this.nome}`);
    this.saveCredor(this.credor);
    this.listaCredores = this.getListCredores();
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
