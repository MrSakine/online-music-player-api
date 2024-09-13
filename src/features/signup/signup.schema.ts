import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type SignupDocument = HydratedDocument<Signup>;

@Schema()
export class Signup {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  mail: string;

  @Prop({ required: true })
  password: string;
}

export const SignupSchema = SchemaFactory.createForClass(Signup);
