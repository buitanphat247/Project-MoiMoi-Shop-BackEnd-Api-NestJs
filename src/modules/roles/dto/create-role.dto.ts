import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Tên không được bỏ trống!' })
  name: string;
  permissions: mongoose.Schema.Types.ObjectId[];
}
