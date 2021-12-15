import User from "../../users/models/User";

export interface SuccessfulAuth {
  user: User;
  token: string;
}

export class ContinueWithGoogleSuccess implements SuccessfulAuth {
  readonly user: User;
  readonly token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }
}

export class TokenValidationSuccess implements SuccessfulAuth {
  readonly user: User;
  readonly token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }
}
