import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ){}

  public isValidField(field:string){
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  onSubmit(){
    this.loginForm.markAllAsTouched();
  }
}
