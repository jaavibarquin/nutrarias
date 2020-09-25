import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationEmailRoutingModule } from './verification-email-routing.module';
import { VerificationEmailComponent } from './verification-email.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VerificationEmailComponent],
  imports: [CommonModule, VerificationEmailRoutingModule, ReactiveFormsModule],
})
export class VerificationEmailModule {}
