import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-policyview',
  templateUrl: './policyview.component.html',
  styleUrls: ['./policyview.component.css']
})
export class PolicyviewComponent implements OnInit {
  public userType;
  public idParam;
  columnDefs = [
    {headerName: 'SI.NO', field: 'id'},
    {headerName: 'Policy Name', field: 'policyName', editable: true},
    {headerName: 'Policy Details', field: 'detailedName', editable: true}
  ];

  rowData: any[];

  userPolicyColDefs = [
    {headerName: 'Policy No', field: 'policyId'},
    {headerName: 'Policy Name', field: 'policy.policyName'},
    {headerName: 'Amount Paid', field: 'amountPaid'},
    {headerName: 'Policy End Date', field: 'policyEndDate'},
    {headerName: 'Valid', field: 'policyEndDate'}
  ];

  userPolicyRowData: any[];

  constructor(http: HttpClient, private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userType = this.route.snapshot.params.type;
    this.idParam = this.route.snapshot.params.id;
    console.log('User type passed ' + this.userType + ' ID : ' + this.idParam);
    this.loadAllPolicies();
    this.loadUserPolicies(this.route.snapshot.params.id);
  }

  loadAllPolicies() {
    fetch('/server/api/v1/3cover/policies/all')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }

  loadUserPolicies(id: number) {
    console.log('Going to load user specific policies for user id: ' + id);

    fetch('/server/api/v1/3cover/users/userPolicies/' + id)
      .then(result => result.json())
      .then(userRowData => this.userPolicyRowData = userRowData);

  }

}
