import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListPostsComponent } from 'src/app/components/posts/list-posts/list-posts.component';
import { TablaPlanesComponent } from '../components/planes/tablaPlanes/tablaPlanes.component';
import { AdminCitasComponent } from '../components/admin-citas/admin-citas.component';
import { CitasOnlineService } from '../services/citas-online.service';
import { TokenService } from '../services/tokenService.service';
@NgModule({
  declarations: [AdminComponent, ListPostsComponent, TablaPlanesComponent, AdminCitasComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [CitasOnlineService, TokenService]
})
export class AdminModule { }
