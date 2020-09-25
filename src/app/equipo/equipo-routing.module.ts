import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipoComponent } from './equipo.component';

const routes: Routes = [{ path: '', component: EquipoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipoRoutingModule { }
