export class User {
  email: string;
  hash: string;
  admin: boolean;
  recoverPasswordAt?: number
}
