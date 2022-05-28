import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './conta/conta.component';
import { CredorComponent } from './credor/credor.component';
import { InicialComponent } from './inicial/inicial.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { SobreComponent } from './sobre/sobre.component';


const routes: Routes = [
  { path: '', component: InicialComponent },
  { path: 'credor', component: CredorComponent },
  { path: 'conta', component: ContaComponent },
  { path: 'lancamento', component: LancamentoComponent },
  { path: 'lancamento/:id', component: LancamentoComponent },
  { path: 'sobre', component: SobreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
