import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();
  email = new FormControl('', [Validators.required, Validators.email]);
  private emailMsg: string;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(  private router: Router

  ) {
  }

  ngOnInit() {

  }


  registerUser() {
    this.emailMsg = this.getErrorMessage();
    if(!(this.emailMsg === '')) {
      console.log('not a valid email');

      return;
    }
    this.user.email = this.email.value;
    console.log('Submitted login ' + JSON.stringify(this.user));

  }
  doReset() {
    this.user = new User();
  }
}
