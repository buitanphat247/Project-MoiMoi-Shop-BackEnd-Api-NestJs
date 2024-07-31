import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  phone: string;
  @Prop()
  age: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: mongoose.Schema.Types.ObjectId;
  @Prop()
  address: string;
  @Prop()
  gender: string;
  @Prop()
  refreshToken: string;
  @Prop()
  createdAt: Date;
  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
  };

  @Prop()
  updateAt: Date;
  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
  };

  @Prop()
  deletedAt: Date;
  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
  };
}

export const UserSchema =
  SchemaFactory.createForClass(User).plugin(softDeletePlugin);
