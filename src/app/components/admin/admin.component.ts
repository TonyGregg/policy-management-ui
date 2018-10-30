import { Component, OnInit } from '@angular/core';
import {PolicyService} from '../../services/policy.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public policies;

  constructor(private  policyService: PolicyService) { }

  ngOnInit() {
    this.getPolicies();
  }

  getPolicies() {
    this.policyService.getAvailablePolicies().subscribe(data =>
      {
        this.policies = data;
      },
      error1 => console.log(error1),
      () => console.log('Policies loaded')
    );
  }

}
