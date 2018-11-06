import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/**
 * Component class for HeaderComponent. It has route links for Login, About Us and Contact Us pages.
 */
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
