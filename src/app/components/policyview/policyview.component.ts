import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {PolicyService} from '../../services/policy.service';
import {Policy} from '../../model/policy';

@Component({
  selector: 'app-policyview',
  templateUrl: './policyview.component.html',
  styleUrls: ['./policyview.component.css']
})

/**
 * PolicyViewComponent - component for viewing / editing policies based on
 * the role passed from router.
 */
export class PolicyViewComponent implements OnInit {
  public userType;
  public idParam;
  public isAdmin: boolean;
  public isUser: boolean;
  public userName: string;

  columnDefs: any[]; // Column definitions for all policies
  rowData: any[]; // Row data holder for policies
  userPolicyRowData: any[]; // User Policies row holder
  returnedPolicy: Policy;
  userPolicyColDefs = [
    {headerName: 'Policy No', field: 'policyId'},
    {headerName: 'Policy Name', field: 'policy.policyName'},
    {headerName: 'Amount Paid', field: 'amountPaid'},
    {headerName: 'Policy End Date', field: 'policyEndDate'},
    {headerName: 'Valid', field: 'valid'}
  ]; // Column definitions for user policies

  /**
   * Constructor for PolicyView. Load the needed classes to fetch policies.
   * @param http - HttpClient class, part of angular framework
   * @param policyService - PolicyService class.
   * @param route - AcivatedRoute for routing needs.
   */
  constructor(http: HttpClient, private policyService: PolicyService, private route: ActivatedRoute) {
  }

  /**
   * Define ag grid column definitions.
   * Set the column edit based on role passed
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
   * @params any cell values
   */
  onCellValueChanged(params: any) {

    if (this.isUser) {
      return;
    }
    // console.log('Inside row value change..');
    // console.log(params.data);

    this.policyService.savePolicy(params.data).subscribe(retPolicy => {
      this.returnedPolicy = retPolicy;
      if (this.returnedPolicy != null) {
        // console.log('Returned policy is not null ');
        console.log('Returned policy from rest api  !! ' + JSON.stringify(this.returnedPolicy));
      }

    });
  } // end of method onCellValueChanged

} // end of component
