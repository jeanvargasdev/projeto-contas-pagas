import { Component, OnInit } from '@angular/core';
import { Credor } from '../model/credor';

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
