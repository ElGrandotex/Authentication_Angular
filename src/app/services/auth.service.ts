import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLoginInterface } from '../interfaces/user-login.interface';
import { environment } from '../environments/environment';
import { UserRegisterInterface } from '../interfaces/user-register.interface';
import { UserInterface } from '../interfaces/user.interface';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: UserInterface;
  private localStorage = this.document.defaultView?.localStorage;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  public login(user: UserLoginInterface): Observable<UserLoginInterface>{
    return this.http.post<UserLoginInterface>(environment.urlSpring+'auth/login', user)
  }

  public register(user: UserRegisterInterface): Observable<UserRegisterInterface>{
    return this.http.post<UserRegisterInterface>(environment.urlSpring+'auth/register', user);
  }
}
