import {User} from './user';
import {Policy} from './policy';

export class UserPolicy {
  policyId: number;
  userId: number;
  amountPaid: number;
  policyEndDate: Date;
  user: User;
  policy: Policy;
}
