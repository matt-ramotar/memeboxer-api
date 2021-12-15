import { DocumentType, prop } from "@typegoose/typegoose";
import { ObjectType } from "type-graphql";

/**
 * @tsoaModel
 */

@ObjectType({ description: "User model" })
export default class User {
  @prop({ ref: () => User })
  id!: string;

  @prop({ unique: true })
  email!: string;

  @prop({ unique: true })
  username!: string;

  @prop()
  name!: string;

  @prop()
  googleId?: string;

  @prop()
  picture?: string;

  @prop()
  isLoggedIn?: boolean;

  public toPojo(this: DocumentType<User>): User {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
