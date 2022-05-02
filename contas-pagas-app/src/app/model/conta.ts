export class Conta {
  descricao: string;
  tipo: string;

  constructor(public desc: string, public tp: string) {
    this.descricao = desc;
    this.tipo = tp;
  }
}
