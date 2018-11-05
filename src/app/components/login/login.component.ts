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
  loginMessage: string;

  // public userFromRepo;

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
      if (this.returnedUser != null) {
        console.log('Returned user is not null ');
        console.log('Returned User  !! ' + JSON.stringify(this.returnedUser));
        if (this.returnedUser.password === this.user.password) {
          console.log('Entered password is matching with DB password');
          if (this.user.userId === 'Admin') {
            this.router.navigateByUrl('/policy/admin/999999999');
          } else {
            this.router.navigateByUrl('/policy/user/' + this.returnedUser.id);
          }
        } else {
          if (this.user.userId === 'Admin') {
            this.loginMessage = 'Contact Admin service';
          } else {
            this.loginMessage = 'Invalid password; please try again';

          }

        }

      } else {
        console.log('Invalid user id or password ' + this.user.userId)
        this.loginMessage = 'You are not a registered User. Register to login';

      }
    });

    // this.getUserFromRepository(this.user.userId);
    // console.log('Returned User ' + JSON.stringify(this.userFromRepo));


  }


  /**
   * The below method works, however a better way identified. Take a look at method above
   // * @param userId
   */
  // getUserFromRepository(userId: string) {
  //   this.userService.getUserFromRepo(userId).subscribe(
  //     data => { this.userFromRepo = data; console.log(JSON.stringify(this.userFromRepo))},
  //     error1 => console.error(error1),
  //     () => console.log('User Loaded from repo !!! yeah !!!')
  //   );
  // }

  routeToRegister() {
    this.router.navigateByUrl('/register');
  }



}
