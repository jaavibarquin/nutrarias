import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraConfirmadaComponent } from './compra-confirmada.component';

const routes: Routes = [{ path: '', component: CompraConfirmadaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraConfirmadaRoutingModule {}
