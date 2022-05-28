import { Credor } from './credor';
import { Conta } from './conta';

export class Lancamento {

  constructor(public id: number, public conta: Conta, public valor: number,
    public dataLancamento: Date, public credor: Credor, public frmPagamento: string) {
    this.id = id;
    this.conta = conta;
    this.valor = valor;
    this.dataLancamento = dataLancamento;
    this.credor = credor;
    this.frmPagamento = frmPagamento
  }
}
