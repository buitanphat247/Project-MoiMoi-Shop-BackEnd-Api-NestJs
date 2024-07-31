import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username không được bỏ trống!' })
  username: string;
  @IsNotEmpty({ message: 'Email không được bỏ trống!' })
  email: string;
  @IsNotEmpty({ message: 'Password không được bỏ trống!' })
  password: string;
  @IsNotEmpty({ message: 'Phone không được bỏ trống!' })
  phone: string;
  @IsNotEmpty({ message: 'Age không được bỏ trống!' })
  age: string;
  @IsNotEmpty({ message: 'Gender không được bỏ trống!' })
  gender: string;
  @IsNotEmpty({ message: 'Address không được bỏ trống' })
  address: string;
}
