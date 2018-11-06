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
export class RegisterComponent implements OnInit {
  user = new User();
  email = new FormControl('', [Validators.required, Validators.email]);
  private emailMsg: string;
  today = new Date();
  confirmPwdMsg: string;
  registerMessage: string;
  public returnedUser: User;



  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(  private router: Router, private userService: UserService

  ) {
  }

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
    this.user.userId = this.user.firstName + (this.user.birthDate.getMonth() + 1 ) + this.user.birthDate.getDate();

    console.log('Submitted login ' + JSON.stringify(this.user));

    this.userService.createUser(this.user).subscribe(retUser => {
      this.returnedUser = retUser;
      if (this.returnedUser != null) {
        console.log('Returned user is not null ');
        // console.log('Returned User  !! ' + JSON.stringify(this.returnedUser));
        if (this.returnedUser.password === this.user.password) {
          this.registerMessage = 'User registration successful. Login with the ' + this.user.userId + ' and provided password';

          console.log('User save successful');
          // this.router.navigateByUrl('/policy');
        } else {
          this.registerMessage = 'Contact Admin service';
        }

      } else {
        console.log('Registration failed ' + this.user.userId);
        this.registerMessage = 'Registration failed';

      }
    });

  }

  /**
   * Do reset the whole form on click of reset
   */
  doReset() {
    this.user = new User();
  }
}
