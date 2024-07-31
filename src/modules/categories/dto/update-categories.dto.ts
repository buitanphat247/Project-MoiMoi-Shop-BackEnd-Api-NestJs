import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-categories.dto';

export class updateCategoryDto extends PartialType(CreateCategoryDto) {}
