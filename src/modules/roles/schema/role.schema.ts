import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { User } from 'src/modules/users/schema/user.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop()
  name: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Permission' })
  permissions: mongoose.Schema.Types.ObjectId[];

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

export const RoleSchema =
  SchemaFactory.createForClass(Role).plugin(softDeletePlugin);
