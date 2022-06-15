import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
    nombre: new FormControl(''),
    apellido1: new FormControl(''),
    apellido2: new FormControl(''),
    birthdate: new FormControl(''),
    phone: new FormControl(''),
  });

  constructor(private authSvc: AuthService, private router: Router) {}


  async onRegister() {
    const {
      email,
      password,
      password2,
      nombre,
      apellido1,
      apellido2,
      birthdate,
      phone,
    } = this.registerForm.value;
    if (this.checkPassword(password, password2)) {
      try {
        const user = await this.authSvc.register(
          email,
          password,
          nombre,
          apellido1,
          apellido2,
          birthdate,
          phone
        );
        if (user) {
          //Redirect a home
          this.checkUserIIsVerified(user);
        }
      } catch (error) {
        window.alert(error);
      }
    }
    // Si las contraseñas no coinciden:
    else {
      window.alert('Las contraseñas no coinciden.');
    }
  }

  private checkPassword(password: string, password2): boolean {
    if (password == password2) {
      return true;
    } else {
      return false;
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
  email1: string;
  password1: string;
  password3: string;
}
