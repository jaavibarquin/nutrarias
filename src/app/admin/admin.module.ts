import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListPostsComponent } from 'src/app/components/posts/list-posts/list-posts.component';
import { TablaPlanesComponent } from '../components/planes/tablaPlanes/tablaPlanes.component';
@NgModule({
  declarations: [AdminComponent, ListPostsComponent, TablaPlanesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AdminModule {}
