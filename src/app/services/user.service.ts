import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {User} from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'})
};
@Injectable({
  providedIn: 'root'
})

/**
 * Service class for fetching user related information from rest APIs
 */

export class UserService {
  /**
   * log a UserService message with the User Service
   */
  private static log(message: string) {
    console.log(message);
  }


  constructor(private http: HttpClient) {

  }


  /**
   *
   * @param userId - userId string, it is firstNameMMDD of user
   */
  getUserByUserId(userId: string): Observable<User> {
    const url = '/server/api/v1/3cover/users/userid/' + userId;
    console.log(url);
    return this.http.get<User>(url).pipe(
      tap(() => UserService.log('Fetched User by userId = ${userId}')),
      catchError(this.handleError<User>('getUserByUserId = ${userId}'))
    );
  }

  createUser(user: User): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post<User>('/server/api/v1/3cover/users', body, httpOptions ).pipe(
      tap(() => UserService.log('Saved user successfully ')),
      catchError(this.handleError<User>('createUser = ${user}'))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      UserService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
