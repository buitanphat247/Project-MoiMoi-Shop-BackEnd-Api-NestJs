import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrderDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  productId: mongoose.Schema.Types.ObjectId;
  description: string;
  @IsNotEmpty()
  quanlity: string;
  @IsNotEmpty()
  status: string;
}
