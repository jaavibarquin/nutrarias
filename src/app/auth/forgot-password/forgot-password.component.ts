import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('');
  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onResetPW() {
    try {
      const email = this.userEmail.value;
      this.authSvc.recoverPassword(email);
      window.alert(
        'Se ha enviado un link de recuperacion de contraseña a tu correo electrónico.'
      );
      //redirect to login
      this.router.navigate(['/login']);
    } catch (error) {
      window.alert(error);
    }
  }
}
