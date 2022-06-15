import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  title = 'Login';

  constructor(private authSvc: AuthService, private router: Router) {}


  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      this.checkUserIIsVerified(user);
    } catch (error) {
      window.alert(error);
    }
  }
  async onGoogleLogin() {
    try {
      const user = await this.authSvc.logInWithGoogle();
      if (user) {
        this.checkUserIIsVerified(user);
      }
      this.router.navigate(['/home']);
    } catch (error) {
      window.alert(error);
    }
  }

  private checkUserIIsVerified(user: UserI) {
    if (user && user.emailVerified) {
      // comprobar que el email esta verificado
      //Redirect a home
      this.router.navigate(['/home']);
    } else if (user) {
      this.router.navigate(['verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
