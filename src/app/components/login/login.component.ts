import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {User} from '../../model/user';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  userId = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);


  constructor(
    private router: Router
    ) {}


  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  getUserIdError() {
    return this.userId.hasError('required') ? 'You must enter a value' : '';
  }
  getPasswordError() {
    return this.password.hasError('required') ? 'You must enter a value' :
        '';
  }

  onFormSubmit() {
    console.log('Submitted login ' + JSON.stringify(this.user));
    this.router.navigateByUrl('/policy');
  }
  routeToRegister() {
    this.router.navigateByUrl('/register');
  }

}
