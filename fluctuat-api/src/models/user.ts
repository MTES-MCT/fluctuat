export class User {
  name: string;
  email: string;
  type: string;
  admin: boolean;

  hash?: string;
  changePasswordAt?: number
}
