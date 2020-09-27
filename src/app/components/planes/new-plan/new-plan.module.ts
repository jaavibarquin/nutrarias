import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { NewPlanComponent } from './new-plan.component';
@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [NewPlanComponent],
})
export class NewPlanModule {}
