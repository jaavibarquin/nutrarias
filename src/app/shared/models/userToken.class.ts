export class UserToken {
  email: string;
  uid: string;

  constructor(email: string, uid: string) {
    this.email = email;
    this.uid = uid;
  }
}