import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor(
    private router: Router
    ) {}


  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  tryLogin() {
    console.log('Submitted login ' + JSON.stringify(this.user));
  }
  routeToRegister() {
    this.router.navigateByUrl('/register');
  }

}
