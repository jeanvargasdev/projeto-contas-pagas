import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CredorComponent } from './credor/credor.component';
import { ContaComponent } from './conta/conta.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { InicialComponent } from './inicial/inicial.component';
import { FormsModule } from '@angular/forms';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { SobreComponent } from './sobre/sobre.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'


@NgModule({
  declarations: [
    AppComponent,
    CredorComponent,
    ContaComponent,
    MenuComponent,
    FooterComponent,
    InicialComponent,
    LancamentoComponent,
    SobreComponent
  ],
  imports: [NgxMaskModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
