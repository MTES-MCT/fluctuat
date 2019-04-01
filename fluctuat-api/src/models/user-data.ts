import { User } from './user';

export class UserData {

  name: string;
  email: string;
  type: string;
  admin: boolean;

  static fromUser(user: User) {
    return {
      name: user.name,
      email: user.email,
      type: user.type,
      admin: user.admin
    };
  }
}
