export class Credor {
  nome: string;
  descricao: string;

  constructor(public nom: string, public desc: string) {
    this.descricao = desc;
    this.nome = nom;
  }
}
