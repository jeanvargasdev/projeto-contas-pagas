import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  ano: number;
  mensagem: string;
  
  constructor() {
    this.ano = new Date().getFullYear();
    this.mensagem = 'Projeto Contas Pagar - UTFPR - Autor Jean Vargas - ' + this.ano + " - Todos os direitos reservados."
   }

  ngOnInit(): void {
  }

}
