import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLoginInterface } from '../interfaces/user-login.interface';
import { environment } from '../environments/environment';
import { UserRegisterInterface } from '../interfaces/user-register.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: UserInterface;

  constructor(private http: HttpClient) { }

  public login(user: UserLoginInterface): Observable<any>{
    return this.http.post<UserLoginInterface>(environment.urlSpring+'auth/login', user)
    .pipe(
      tap(user => this.user = user),
    )
  }

  public register(user: UserRegisterInterface): Observable<UserRegisterInterface>{
    return this.http.post<UserRegisterInterface>(environment.urlSpring+'auth/register', user);
  }
}
