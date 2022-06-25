import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWTTokenI } from '../shared/models/jwtToken.interface';
import { UserToken } from '../shared/models/userToken.class';

const TOKEN_KEY = "AuthToken";
const EMAIL_KEY = "AuthEmail";
const UID_KEY = "AuthUid";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  basePath: string | null;

  constructor(private httpclient: HttpClient) {
    this.basePath = `http://localhost:8080/auth/getToken`;
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY);
  }
  public setEmail(email: string): void {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }
  public getUid(): string {
    return sessionStorage.getItem(UID_KEY);
  }
  public setUid(uid: string): void {
    window.sessionStorage.removeItem(UID_KEY);
    window.sessionStorage.setItem(UID_KEY, uid);
  }

  public obtenToken(email: string, uid: string): Observable<JWTTokenI> {
    let usr: UserToken = new UserToken(email, uid);
    return this.httpclient.post<JWTTokenI>(this.basePath, usr);
  }

}
