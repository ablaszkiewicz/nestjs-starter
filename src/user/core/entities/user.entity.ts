import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from './user.interface';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users' })
export class UserEntity {
  _id: string;

  @Prop()
  email: string;

  public static mapToInterface(user: UserEntity): IUser {
    return {
      id: user._id,
      email: user.email,
    };
  }
}

export type UserDocument = HydratedDocument<UserEntity>;

export const UserSchema = SchemaFactory.createForClass(UserEntity);
