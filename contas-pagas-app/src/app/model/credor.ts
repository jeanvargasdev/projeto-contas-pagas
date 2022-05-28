import { ThisReceiver } from "@angular/compiler";

export class Credor {
  constructor(public nome: string, public descricao: string, public id: number) {
    this.id = id;
    this.descricao = descricao;
    this.nome = nome;
  }
}
