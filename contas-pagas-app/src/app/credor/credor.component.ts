import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credor',
  templateUrl: './credor.component.html',
  styleUrls: ['./credor.component.css']
})
export class CredorComponent implements OnInit {

  nome: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(`O nome é: ${this.nome}`);
  }
}
