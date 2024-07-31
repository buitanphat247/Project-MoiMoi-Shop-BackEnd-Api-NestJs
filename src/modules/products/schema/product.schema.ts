import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  description: string;
  @Prop()
  quanlity: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categories: mongoose.Schema.Types.ObjectId;
  @Prop()
  images: string[];
  @Prop()
  discount: number;

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

export const ProductSchema =
  SchemaFactory.createForClass(Product).plugin(softDeletePlugin);
