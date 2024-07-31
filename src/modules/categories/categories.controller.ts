import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { UserInterface } from '../users/users.interface';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { updateCategoryDto } from './dto/update-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @ResponseMessage('Get all orders')
  @Get()
  findAll(
    @Query() qs: string,
    @Query('limit') limit: number,
    @Query('current') currentPage: number,
  ) {
    return this.categoriesService.findAll(qs, +currentPage, +limit);
  }

  @Public()
  @Get('/:id')
  @ResponseMessage('Find a category by id')
  findOne(@Param('id') _id: string) {
    return this.categoriesService.findOne(_id);
  }

  @Post()
  @ResponseMessage('Create a new category')
  create(@Body() categoryDto: CreateCategoryDto, @User() user: UserInterface) {
    return this.categoriesService.create(categoryDto, user);
  }

  @Put('/:id')
  @ResponseMessage('Update a category by id')
  update(
    @Body() categoryDto: updateCategoryDto,
    @User() user: UserInterface,
    @Param('id') _id: string,
  ) {
    return this.categoriesService.update(categoryDto, user, _id);
  }

  @ResponseMessage('Delete a category by id')
  @Delete('/:id')
  delete(@Param('id') _id: string, @User() user: UserInterface) {
    return this.categoriesService.delete(_id, user);
  }
}
