import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCitasComponent } from './admin-citas.component';
import { AdminCitasRoutingModule } from './admin-citas-routing.module';

import { MaterialModule } from '../../material.module';
import { CitasOnlineService } from '../../services/citas-online.service';
import { TokenService } from '../../services/tokenService.service';

@NgModule({
  declarations: [AdminCitasComponent],
  imports: [CommonModule, AdminCitasRoutingModule, MaterialModule],
  providers: [CitasOnlineService, TokenService]
})
export class AdminCitasModule { }