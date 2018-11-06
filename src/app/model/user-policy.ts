import {User} from './user';
import {Policy} from './policy';

/**
 * Class for UserPolicy
 *
 */
export class UserPolicy {
  policyId: number;
  userId: number;
  amountPaid: number;
  policyEndDate: Date;
  valid: string;
  user: User;
  policy: Policy;
}
