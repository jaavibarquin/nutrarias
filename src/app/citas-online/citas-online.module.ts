import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasOnlineRoutingModule } from './citas-online-routing.module';
import { CitasOnlineComponent } from './citas-online.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [CitasOnlineComponent],
  imports: [
    CommonModule,
    CitasOnlineRoutingModule,
    MaterialModule
  ]
})
export class CitasOnlineModule { }
