import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserRegisterInterface } from '../../interfaces/user-register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    country: ['Ecuador', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){}

  public isValidField(field:string){
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
  }

  onSubmit(){
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const user: UserRegisterInterface = {
        username: this.registerForm.controls['username'].value,
        password: this.registerForm.controls['password'].value,
        firstname: this.registerForm.controls['firstname'].value,
        lastname: this.registerForm.controls['lastname'].value,
        country: this.registerForm.controls['country'].value,
      }
      this.auth.register(user).subscribe( user =>
        this.router.navigate(['auth/login'])
      )
    }
  }
}
