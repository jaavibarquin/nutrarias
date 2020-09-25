import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetodoRoutingModule } from './metodo-routing.module';
import { MetodoComponent } from './metodo.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { NutricionComponent } from './nutricion/nutricion.component';

@NgModule({
  declarations: [MetodoComponent, EntrenamientoComponent, NutricionComponent],
  imports: [CommonModule, MetodoRoutingModule],
})
export class MetodoModule {}
