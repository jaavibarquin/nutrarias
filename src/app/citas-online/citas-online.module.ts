import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasOnlineRoutingModule } from './citas-online-routing.module';
import { CitasOnlineComponent } from './citas-online.component';
import { MaterialModule } from '../material.module';

import { CitasOnlineService } from '../services/citas-online.service';

@NgModule({
  declarations: [CitasOnlineComponent],
  imports: [
    CommonModule,
    CitasOnlineRoutingModule,
    MaterialModule
  ],
  providers: [ CitasOnlineService ],
})
export class CitasOnlineModule { }
