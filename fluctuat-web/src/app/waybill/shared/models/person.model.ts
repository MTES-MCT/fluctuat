export class Person {
  name: string;
  email: string;

  static fromObj(obj): Person {
    return Object.assign(new Person(), obj);
  }
}
