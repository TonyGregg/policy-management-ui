import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {User} from '../../model/user';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = new User();
  public returnedUser: User;
  public userFromRepo;

  userId = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]);
  password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]);


  constructor(
    private router: Router,
    private userService: UserService
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
    this.userService.getUserByUserId(this.user.userId).subscribe(user => {
      this.returnedUser = user;
      console.log('Returned User  !! ' + JSON.stringify(this.returnedUser));
    });

    // this.getUserFromRepository(this.user.userId);
    // console.log('Returned User ' + JSON.stringify(this.userFromRepo));


    this.router.navigateByUrl('/policy');
  }

  getUserFromRepository(userId: string) {
    this.userService.getUserFromRepo(userId).subscribe(
      data => { this.userFromRepo = data; console.log(JSON.stringify(this.userFromRepo))},
      error1 => console.error(error1),
      () => console.log('User Loaded from repo !!! yeah !!!')
    );
  }

  routeToRegister() {
    this.router.navigateByUrl('/register');
  }



}
