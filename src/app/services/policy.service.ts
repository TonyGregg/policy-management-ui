import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({'Content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private  http: HttpClient) { }

  getAvailablePolicies() {
    return this.http.get('/server/api/v1/3cover/policies/all');
  }
}
