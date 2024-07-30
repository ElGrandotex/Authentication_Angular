import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLoginInterface } from '../interfaces/user-login.interface';
import { environment } from '../environments/environment';
import { UserRegisterInterface } from '../interfaces/user-register.interface';
import { UserVerifyInterface } from '../interfaces/user-verify.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: UserLoginInterface;

  constructor(private http: HttpClient) { }

  get currentUser(){
    if(!this.user) return undefined;
    return this.user;
  }

  public login(user: UserLoginInterface): Observable<any>{
    return this.http.post<UserLoginInterface>(environment.urlSpring+'auth/login', user)
    .pipe(
      tap(userV => this.user = user),
    )
  }

  public register(user: UserRegisterInterface): Observable<UserRegisterInterface>{
    return this.http.post<UserRegisterInterface>(environment.urlSpring+'auth/register', user);
  }

  public verifyUser(user: UserVerifyInterface): Observable<UserVerifyInterface>{
    return this.http.post<UserVerifyInterface>(environment.urlSpring+'auth/verify', user);
  }
}
