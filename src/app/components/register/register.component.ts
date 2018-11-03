import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();

  constructor(  private router: Router

  ) {
  }

  ngOnInit() {

  }


  registerUser() {
    console.log('Submitted login ' + JSON.stringify(this.user));

  }
  doReset() {
    this.user = new User();
  }
}
