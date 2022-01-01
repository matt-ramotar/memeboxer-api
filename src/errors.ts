export interface MemeboxerError {
  message?: string;
  error?: any;
}

export class RealMemeboxerError implements MemeboxerError {
  readonly message: string;
  readonly error?: any;
  readonly type: string;

  constructor(message: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class RelationshipAlreadyExists implements MemeboxerError {
  readonly message?: string = "Relationship already exists";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class ActionNotFound implements MemeboxerError {
  readonly message?: string = "Action not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class MemeNotFound implements MemeboxerError {
  readonly message?: string = "Meme not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class MemeViewNotFound implements MemeboxerError {
  readonly message?: string = "Meme view not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class MemeReactionNotFound implements MemeboxerError {
  readonly message?: string = "Meme reaction not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class MemeTagNotFound implements MemeboxerError {
  readonly message?: string = "Meme tag not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class ReactionNotFound implements MemeboxerError {
  readonly message?: string = "Reaction not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class TagNotFound implements MemeboxerError {
  readonly message?: string = "Tag not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class NotificationNotFound implements MemeboxerError {
  readonly message?: string = "Notification not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class TemplateNotFound implements MemeboxerError {
  readonly message?: string = "Template not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class UserNotFound implements MemeboxerError {
  readonly message?: string = "User not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class CommentNotFound implements MemeboxerError {
  readonly message?: string = "Comment not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class CommentReactionNotFound implements MemeboxerError {
  readonly message?: string = "Comment reaction not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class CommentUpvoteNotFound implements MemeboxerError {
  readonly message?: string = "Comment upvote not found";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}

export class ObjectAlreadyExists implements MemeboxerError {
  readonly message?: string = "Object already exists";
  readonly error?: any;
  readonly type: string;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
    this.type = this.constructor.name;
  }
}
