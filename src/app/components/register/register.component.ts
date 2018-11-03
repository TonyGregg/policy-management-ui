import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  dateOfBirth: FormControl;
  address: FormControl;
  contactNumber: FormControl;
  validMessage = '';
  isSamePassword = false;

  constructor() { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(1)]),
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(4)]),
    this.email = new FormControl('', [Validators.required, Validators.minLength(4)]),
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]),
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(5)]),
    this.dateOfBirth = new FormControl('', [Validators.required, Validators.minLength(5)]),
    this.address = new FormControl('', [Validators.required, Validators.minLength(5)]),
    this.contactNumber = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  createForm() {
    this.registerForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password : this.password,
      confirmPassword: this.confirmPassword,
      dateOfBirth: this.dateOfBirth,
      address: this.address,
      contactNumber : this.contactNumber
    });
  }

  registerUser() {
    this.isSamePassword = false;

    if(this.password.value == this.confirmPassword.value) {
      this.isSamePassword = true;
    }
    console.log('Going to register user...' + this.firstName);
  }

}
