import { Component, Input, OnInit } from '@angular/core';
import { Credor } from 'src/app/model/credor';

@Component({
  selector: 'app-credor-lista',
  templateUrl: './credor-lista.component.html',
  styleUrls: ['./credor-lista.component.css']
})
export class CredorListaComponent implements OnInit {
  @Input() nome: String = '';

  constructor() { }

  ngOnInit(): void {

  }
}
