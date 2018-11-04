import {Adapter} from '../core/adapter';
import {Injectable} from '@angular/core';

export class User {
  public id: number;
  public userId: string;
  public  firstName: string;
  public lastName: string;
  public birthDate: Date;
  public address: string;
  public contactNumber: string;
  public email: string;
  public password: string;
  public confirmPassword: string;

}

// @Injectable({
//   providedIn: 'root'
// })
// export class UserAdapter implements Adapter<User> {
//
//   adapt(item: any): User {
//     user: User;
//     user.id = item.id;
//
//       item.id,
//       item.userId,
//       item.firstName,
//       item.lastName,
//       new Date(item.birthDate),
//       item.address,
//       item.contactNumber,
//       item.email,
//       item.password,
//       item.confirmPassword,
//     ;
//   }
// }
