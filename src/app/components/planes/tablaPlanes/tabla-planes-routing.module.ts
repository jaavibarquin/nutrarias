import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaPlanesComponent } from './tablaPlanes.component';

const routes: Routes = [{ path: '', component: TablaPlanesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaPlanesRoutingModule {}
