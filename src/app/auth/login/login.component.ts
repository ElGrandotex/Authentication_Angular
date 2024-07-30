import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserLoginInterface } from '../../interfaces/user-login.interface';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private localStorage = this.document.defaultView?.localStorage;
  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ){}

  public isValidField(field:string){
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  onSubmit(){
    this.loginForm.markAllAsTouched();
    const user: UserLoginInterface = {
      username : this.loginForm.controls['username'].value,
      password : this.loginForm.controls['password'].value
    }
    if (this.loginForm.valid) {
      this.auth.login(user).subscribe(
        (response) => {
          const token = response.token;
          this.localStorage?.setItem('token', token)
          this.router.navigate(['/home'])
        },
        (error)=> {
          console.error(error);
        }
      )
    }
  }
}
