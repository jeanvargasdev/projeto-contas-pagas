
export class DataStorage {
  constructor() { }

  //busca uma estrutura genérica por tipo de classe
  static getList(classe: string): any {
    return JSON.parse(localStorage.getItem(classe)!);
  }

  //inicializa o data Storage de acordo com o tipo de classe
  static initDataStorage(classe: string): void {
    localStorage.setItem(classe, JSON.stringify([]));
  }

  //salva item no data Storage
  saveItem(item: string, value: any) {
    localStorage.setItem(item, JSON.stringify(value));
  }
}
