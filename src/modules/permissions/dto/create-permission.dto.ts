import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Name không được bỏ trống!' })
  name: string;
  @IsNotEmpty({ message: 'Method không được bỏ trống!' })
  method: string;
  @IsNotEmpty({ message: 'ApiPath không được bỏ trống!' })
  apiPath: string;
  @IsNotEmpty({ message: 'Module không được bỏ trống!' })
  module: string;
  description: string;
}
