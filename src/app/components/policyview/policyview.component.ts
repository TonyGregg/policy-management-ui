import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-policyview',
  templateUrl: './policyview.component.html',
  styleUrls: ['./policyview.component.css']
})
export class PolicyviewComponent implements OnInit {
  columnDefs = [
    {headerName: 'SI.NO', field: 'id'},
    {headerName: 'Policy Name', field: 'policyName', editable: true},
    {headerName: 'Policy Details', field: 'detailedName', editable: true}
  ];

  rowData = [];


  constructor(http: HttpClient) {
  }

  ngOnInit() {
    fetch('/server/api/v1/3cover/policies/all')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);  }



}
