import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { EquipoComponent } from './equipo.component';


@NgModule({
  declarations: [EquipoComponent],
  imports: [
    CommonModule,
    EquipoRoutingModule
  ]
})
export class EquipoModule { }
