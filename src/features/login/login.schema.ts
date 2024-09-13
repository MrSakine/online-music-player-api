import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Signup } from '../signup/signup.schema';

export type LoginDocument = HydratedDocument<Login>;

@Schema()
export class Login {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Signup' })
  user: Signup;

  @Prop({})
  accessToken: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
