import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Policy} from '../model/policy';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'})
};

@Injectable({
  providedIn: 'root'
})
/**
 * Service class for policies
 */
export class PolicyService {

  constructor(private  http: HttpClient) { }

  savePolicy(policy: Policy): Observable<Policy> {
    const body = JSON.stringify(policy);
    return this.http.post<Policy>('/server/api/v1/3cover/policies', body, httpOptions ).pipe(
      tap(_ => this.log('Saved policy successfully ')),
      catchError(this.handleError<Policy>('createUser = ${user}'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /**
   * log a UserService message with the User Service
   */
  private log(message: string) {
    console.log(message);
  }
}
