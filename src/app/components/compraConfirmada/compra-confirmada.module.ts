import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompraConfirmadaComponent } from './compra-confirmada.component';
import { CompraConfirmadaRoutingModule } from './compra-confirmada-routing.module';

@NgModule({
  imports: [CommonModule, CompraConfirmadaRoutingModule],
  declarations: [CompraConfirmadaComponent],
})
export class CompraConfirmadaModule {}
