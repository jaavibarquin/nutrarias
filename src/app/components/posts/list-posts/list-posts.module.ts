import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPostsRoutingModule } from './list-posts-routing.module';
import { ListPostsComponent } from './list-posts.component';
import { MaterialModule } from '/Users/barquinj/Projects/RAMFITweb/src/app/material.module';
@NgModule({
  declarations: [ListPostsComponent],
  imports: [CommonModule, ListPostsRoutingModule, MaterialModule],
})
export class ListPostsModule {}
