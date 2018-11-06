import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/**
 * Component class for user registration.
 */
export class RegisterComponent implements OnInit {
  user = new User();
  email = new FormControl('', [Validators.required, Validators.email]);
  private emailMsg: string;
  today = new Date();
  confirmPwdMsg: string;
  registerMessage: string;
  public returnedUser: User;


  /**
   * Get error message if email field has invalid values.
   */
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  /**
   * load the class with needed classes to save user information to DB.
   * @param router - Router
   * @param userService - UserService
   */

  constructor(  private router: Router, private userService: UserService

  ) {
  }

  /**
   * Left it for future use. Initialize the Register page if required.
   */
  ngOnInit() {

  }

  /**
   * Save the user information to DB via rest API call
   */
  registerUser() {
    this.registerMessage = null;
    this.confirmPwdMsg = null;
    this.emailMsg = this.getErrorMessage();

    if (this.user.password !== this.user.confirmPassword) {
      this.confirmPwdMsg = 'Password and confirm password is not matching';
      return;
    }
    if (!(this.emailMsg === '')) {
      console.log('not a valid email');
      return;
    }
    this.user.email = this.email.value;
    // UserID is first name + Month + Date of Birthday
    this.user.userId = this.user.firstName + (this.user.birthDate.getMonth() + 1 ) + this.user.birthDate.getDate();
    // console.log('Submitted login ' + JSON.stringify(this.user));

    this.userService.createUser(this.user).subscribe(retUser => {
      this.returnedUser = retUser;
      if (this.returnedUser != null) {
        // console.log('Returned user is not null ');
        // console.log('Returned User  !! ' + JSON.stringify(this.returnedUser));
        if (this.returnedUser.password === this.user.password) {
          this.registerMessage = 'User registration successful. Login with the ' + this.user.userId + ' and provided password';
        } else {
          this.registerMessage = 'Contact Admin service';
        } // end admin user

      } else {
        // console.log('Registration failed ' + this.user.userId);
        this.registerMessage = 'Registration failed';

      } // end else reistration failed.
    }); // end of invoking user service to save user records.

  }

  /**
   * Do reset the whole form on click of reset
   */
  doReset() {
    this.user = new User();
  }
}
