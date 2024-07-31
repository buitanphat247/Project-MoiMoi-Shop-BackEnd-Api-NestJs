import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được bỏ trống!' })
  name: string;

  @IsNotEmpty({ message: 'Giá không được bỏ trống!' })
  price: string;

  @IsNotEmpty({ message: 'Mô tả không được bỏ trống!' })
  description: string;

  @IsNotEmpty({ message: 'Số lượng không được bỏ trống!' })
  quanlity: string;

  @IsNotEmpty({ message: 'Danh mục không được bỏ trống!' })
  categories: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Hình ảnh không được bỏ trống!' })
  images: string[];

  @IsOptional()
  @IsString({ message: 'Giảm giá phải là chuỗi ký tự!' })
  discount: string;
}
