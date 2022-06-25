import { Conta } from "../model/conta";
import { Credor } from "../model/credor";
import { Lancamento } from "../model/lancamento";

export class Util {
  public static clonar(entidade: any, tipo: string) {
    let clone: any;

    if (tipo === 'credores') {
      clone = new Credor(entidade.id, entidade.descricao, entidade.nome);
      clone.id = entidade.id;
      clone.descricao = entidade.descricao;
      clone.nome = entidade.nome;
      return clone;
    }

    if (tipo === 'contas') {
      clone = new Conta(entidade.id, entidade.tipo);
      clone.id = entidade.id;
      clone.tipo = entidade.tipo;
      return clone;
    }

    if (tipo === 'lancamentos') {
      clone = new Lancamento(entidade.id, entidade.conta, entidade.valor,
        entidade.dataLancamento, entidade.credor, entidade.frmPagamento);
      clone.id = entidade.id;
      clone.conta = entidade.conta;
      clone.valor = entidade.valor;
      clone.dataLancamento = entidade.dataLancamento;
      clone.credor = entidade.credor;
      clone.frmPagamento = entidade.frmPagamento
      return clone;
    }
  }

  public static confirmar(entidade: any) {
    let msg: string = 'Deseja realmente excluir o ';

    if (entidade as Credor) {
      msg += 'credor de ID: ' + entidade.id;
    }
    else if (entidade as Lancamento) {
      msg += 'lancamento de ID: ' + entidade.id;
    }
    else msg += 'conta de ID: ' + entidade.id;

    let result = window.confirm(msg)
    return result;
  }

  public static retornaId(lista: any) {
    let valorMaximo = lista.reduce((acc: number, item: { id: number; }) =>
      acc = acc > item.id ? acc : item.id, 0);
    return valorMaximo;
  }
}

