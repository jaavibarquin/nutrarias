import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodoComponent } from './metodo.component';

const routes: Routes = [{ path: '', component: MetodoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodoRoutingModule {}
