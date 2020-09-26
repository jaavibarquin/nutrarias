import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPostComponent } from './edit-post.component';
import { MaterialModule } from '../../../material.module';
@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [EditPostComponent],
})
export class EditPostModule {}
