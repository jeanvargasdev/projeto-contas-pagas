import { Component, OnInit } from '@angular/core';
import { Credor } from '../model/credor';
import { DataStorage } from '../util/DataStorage';
import { InicialComponent } from './../inicial/inicial.component';

@Component({
  selector: 'app-credor',
  templateUrl: './credor.component.html',
  styleUrls: ['./credor.component.css']
})
export class CredorComponent implements OnInit {

  nome: string = '';
  credor!: Credor;
  listaCredores!: Credor[];
  entidade: string = "Credores";

  constructor() { }

  ngOnInit(): void {
    this.listaCredores = [];
    this.credor = new Credor('', '');
    //DataStorage.initDataStorage(Credor);
  }

  onSubmit() {
    console.log(`O nome é: ${this.nome}`);
  }

  saveCredor(credor: Credor) {
    //salva no storage

    //adiciona na lista
    this.listaCredores.push(credor);
  }

  getListCredores() {
    return this.listaCredores;
  }
}
