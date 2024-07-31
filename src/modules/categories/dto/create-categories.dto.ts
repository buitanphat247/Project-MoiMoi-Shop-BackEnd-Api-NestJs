import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Thẻ không được bỏ trống!' })
  name: string;
  path: string;
}
