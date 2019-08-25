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

/*
* Component class for Login page
*/
export class LoginComponent implements OnInit {
  public user = new User();
  public returnedUser: User;
  loginMessage: string;
  userId = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]);
  password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]);


  constructor(
    private router: Router,
    private userService: UserService
    ) {}


  /**
   * Initialize if anything special to be done on login page before load.
   * Left it for future use.
   */
  ngOnInit() {

  }

  /**
   * Get the error message if User ID has issues
   */
  getUserIdError() {
    return this.userId.hasError('required') ? 'You must enter a value' : '';
  }

  /**
   * Get the error message if Password field has issues
   */
  getPasswordError() {
    return this.password.hasError('required') ? 'You must enter a value' :
        '';
  }

  /**
   * Authenticate user with the passed user name and password.
   */

  onFormSubmit() {
    console.log('Submitted login ' + JSON.stringify(this.user));
    this.userService.getUserByUserId(this.user.userId).subscribe(user => {
      this.returnedUser = user;
      if (this.returnedUser != null) {
        // console.log('Returned user is not null ');
        // console.log('Returned User  !! ' + JSON.stringify(this.returnedUser));
        if (this.returnedUser.password === this.user.password) {
          // console.log('Entered password is matching with DB password');
          if (this.user.userId === 'Admin') {
            this.router.navigateByUrl('/policy/admin/999999999/' + this.user.userId);
          } else {
            this.router.navigateByUrl('/policy/user/' + this.returnedUser.id + '/' + this.user.userId);
          }
        } else { // User data is not in DB
          if (this.user.userId === 'Admin') { // Admin
            this.loginMessage = 'Contact Admin service';
          } else { // User password not matching with DB password
            this.loginMessage = 'Invalid password; please try again';

          }

        } // end else the user is not in DB

      } else {
        // console.log('Invalid user id or password ' + this.user.userId);
        this.loginMessage = 'You are not a registered User. Register to login';

      }
    });
  } // end of login form submit method


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

  /**
   * Route to register on click of Register button is clicked
   */
  routeToRegister() {
    this.router.navigateByUrl('/register');
  }

} // end of component - LoginComponent
