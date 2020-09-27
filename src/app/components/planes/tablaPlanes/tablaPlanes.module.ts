import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaPlanesComponent } from './tablaPlanes.component';

import { MaterialModule } from '/Users/barquinj/Projects/RAMFITweb/src/app/material.module';
@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [TablaPlanesComponent],
})
export class TablaPlanesModule {}
