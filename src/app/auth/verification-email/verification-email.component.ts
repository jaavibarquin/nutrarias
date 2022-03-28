import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.component.html',
  styleUrls: ['./verification-email.component.css'],
})
export class VerificationEmailComponent implements OnDestroy {
  public user$: Observable<UserI> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) {}

  onVerificationEmail(): void {
    // service sendConfirmationEmail
    this.authSvc.sendVerifEmail();
  }
  ngOnDestroy() {
    this.authSvc.logout();
  }
}
