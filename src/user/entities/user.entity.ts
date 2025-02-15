import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop()
  email: string;
}
