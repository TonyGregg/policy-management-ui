import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
// import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  userName: FormControl;
  password: FormControl;


  validMessage  = '';



  constructor(
    private formBuilder: FormBuilder
    ) {}


  ngOnInit() {
    this.createFormControls();
    this.createForm();

  }

  createFormControls() {
    this.userName = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password
    });
  }
  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  tryLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('login form is invalid')
      return;
    }
    console.log('User Name ' + this.userName.value+ ' password : '+ this.password.value);
  }

}
