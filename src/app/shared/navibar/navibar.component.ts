import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserI } from '../models/user.interface';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css'],
})
export class NavibarComponent implements OnInit {
  public isLogged = false;
  public user$: Observable<UserI> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router) {}

  async ngOnInit() {}

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      window.alert(error);
    }
  }
}
