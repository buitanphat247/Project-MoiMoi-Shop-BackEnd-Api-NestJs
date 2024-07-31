import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { User } from 'src/modules/users/schema/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
 
  @Prop()
  username: string;
  @Prop()
  phone: string;
  @Prop()
  email: string;
  @Prop()
  description: string;
  @Prop()
  address: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: string;
  @Prop()
  quanlity: string;
  // @Prop({ default: 'PENDING' })
  @Prop()
  status: string;

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

export const OrderSchema =
  SchemaFactory.createForClass(Order).plugin(softDeletePlugin);
