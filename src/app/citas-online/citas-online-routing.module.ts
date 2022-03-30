import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CitasOnlineComponent } from './citas-online.component';

const routes: Routes = [{ path: '', component: CitasOnlineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasOnlineRoutingModule { }
