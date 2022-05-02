import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {
  imageURL: string = 'https://www.revistadapapelaria.com.br/wp-content/uploads/2020/04/Calculadoras.jpg';

  constructor() { }

  getBackgroundImage() {
    return {
      'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.9)), url(' + this.imageURL + ')',
    };
  }

  ngOnInit(): void {
  }

}
