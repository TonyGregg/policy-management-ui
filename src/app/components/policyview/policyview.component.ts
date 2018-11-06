import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {PolicyService} from '../../services/policy.service';
import {Policy} from '../../model/policy';

@Component({
  selector: 'app-policyview',
  templateUrl: './policyview.component.html',
  styleUrls: ['./policyview.component.css']
})
export class PolicyViewComponent implements OnInit {
  public userType;
  public idParam;
  public isAdmin: boolean;
  public isUser: boolean;
  public userName: string;
  columnDefs: any[];



  rowData: any[];
  userPolicyRowData: any[];
  returnedPolicy: Policy;

  userPolicyColDefs = [
    {headerName: 'Policy No', field: 'policyId'},
    {headerName: 'Policy Name', field: 'policy.policyName'},
    {headerName: 'Amount Paid', field: 'amountPaid'},
    {headerName: 'Policy End Date', field: 'policyEndDate'},
    {headerName: 'Valid', field: 'valid'}
  ];
  public gridApi;

  onGridReady(params) {
    this.gridApi = params.api;

    params.api.sizeColumnsToFit();
  }

  constructor(http: HttpClient, private policyService: PolicyService, private route: ActivatedRoute) {
  }

  /**
   * Define ag grid column definitions.
   * Set if the column is editable based on user type passed
   */
  ngOnInit() {
    this.userType = this.route.snapshot.params.type;
    this.userName = this.route.snapshot.params.userName;

    if (this.userType === 'admin') {
      this.isAdmin = true;
      this.isUser = false;
    } else {
      this.isAdmin = false;
      this.isUser = true;
    }
    this.columnDefs = [
      {headerName: 'SI.NO', field: 'id'},
      {headerName: 'Policy Name', field: 'policyName', editable: (!this.isUser)},
      {headerName: 'Policy Details', field: 'detailedName', editable: (!this.isUser)}
    ];
    this.idParam = this.route.snapshot.params.id;
    console.log('User type passed ' + this.userType + ' ID : ' + this.idParam);
    this.loadAllPolicies();
    this.loadUserPolicies(this.idParam);
  }

  /**
   * Load all the policies from rest (from DB)
   */

  loadAllPolicies() {
    fetch('/server/api/v1/3cover/policies/all')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }


  /**
   * Load policies specific to given user id
   * @param id of the user
   */
  loadUserPolicies(id: number) {
    console.log('Going to load user specific policies for user id: ' + id);

    fetch('/server/api/v1/3cover/users/userPolicies/' + id)
      .then(result => result.json())
      .then(userRowData => this.userPolicyRowData = userRowData);

  }

  /**
   * This method will be invoked whenever the admin makes changes to policy name or detailed name
   * It saves to DB automatically immediately after the edit
   * @param cell values
   */
  onCellValueChanged(params: any) {

    if (this.isUser) {
      return;
    }
    console.log('Inside row value change..');
    // console.log(params.data);

    this.policyService.savePolicy(params.data).subscribe(retPolicy => {
      this.returnedPolicy = retPolicy;
      if (this.returnedPolicy != null) {
        console.log('Returned policy is not null ');
        console.log('Returned policy from rest api  !! ' + JSON.stringify(this.returnedPolicy));
      }

    });
  }

}
