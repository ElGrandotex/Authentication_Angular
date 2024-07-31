import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserLoginInterface } from '../../interfaces/user-login.interface';
import { DOCUMENT } from '@angular/common';
import { UserVerifyInterface } from '../../interfaces/user-verify.interface';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrl: './principal-page.component.css'
})
export class PrincipalPageComponent implements OnInit {

  message = {}

  private token = localStorage.getItem('token') || '';
  constructor(
    private authSrv: AuthService,
    private demoSrv: DemoService,
  ){}

  ngOnInit(): void {
    this.user
      this.validate();
      this.test()
  }

  get user(): UserLoginInterface|undefined{
    return this.authSrv.currentUser;
  }

  validate(){
    const username = this.user?.username || '';
    console.log(username);

    console.log(this.token);

    const verify: UserVerifyInterface = {
      username: username,
      token: this.token.toString()
    }
    this.authSrv.verifyUser(verify).subscribe(response =>
      console.log("Res:",response)
    )
  }

  test(){
    this.demoSrv.demo(this.token).subscribe(
      response => {
        console.log(response)
        this.message=response
      },
    )
  }
}
