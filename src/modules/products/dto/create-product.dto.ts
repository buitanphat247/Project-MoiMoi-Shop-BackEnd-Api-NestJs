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
  quantity: string;

  @IsNotEmpty({ message: 'Danh mục không được bỏ trống!' })
  category: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Hình ảnh không được bỏ trống!' })
  images: string[];

  @IsNotEmpty({ message: 'Giảm giá không được bỏ trống!' })
  discount: string;
}
