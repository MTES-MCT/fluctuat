export class User {
  name: string;
  email: string;
  type: string;

  hash?: string;
  admin: boolean;
  recoverPasswordAt?: number
}
