import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Reaction model" })
export default class Reaction {
  @Field(() => ID)
  @prop({ ref: () => Reaction })
  id!: string;

  @Field()
  @prop()
  native?: string;

  @Field()
  @prop()
  name!: string;

  @Field()
  @prop()
  colons?: string;

  @Field()
  @prop()
  skin?: number;

  @Field()
  @prop()
  isCustom!: boolean;

  @Field()
  @prop()
  imageUrl?: string;

  public toPojo(this: DocumentType<Reaction>): Reaction {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
