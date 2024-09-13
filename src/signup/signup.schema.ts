import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SignupDocument = HydratedDocument<Signup>;

@Schema()
export class Signup {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  mail: string;

  @Prop({ required: true })
  password: string;
}

export const SignupSchema = SchemaFactory.createForClass(Signup);
