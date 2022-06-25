import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminCitasComponent } from './admin-citas.component';

const routes: Routes = [{ path: '', component: AdminCitasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCitasRoutingModule { }