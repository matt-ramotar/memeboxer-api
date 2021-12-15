export enum UnsuccessfulTokenValidationReason {
  InvalidToken = "INVALID TOKEN",
  ExpiredToken = "EXPIRED TOKEN",
  ErrorDecodingToken = "ERROR DECODING TOKEN"
}

export interface UnsuccessfulAuth {
  params: string[];
  message: string;
}

export class InvalidToken implements UnsuccessfulAuth {
  params = ["token"];
  message = "Token is invalid.";
}

export class ExpiredToken implements UnsuccessfulAuth {
  params = ["token"];
  message = "Token has expired.";
}

export class ErrorDecodingToken implements UnsuccessfulAuth {
  params = ["token"];
  message = "Error occurred when decoding token.";
}
