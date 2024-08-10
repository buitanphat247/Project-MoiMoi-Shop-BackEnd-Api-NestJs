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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  Public,
  ResponseMessage,
  SkipPermission,
  User,
} from 'src/decorator/customize';
import { UserInterface } from '../users/users.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @ResponseMessage('Find all products')
  findAll(
    @Query() qs: string,
    @Query('current') currentPage: number,
    @Query('limit') limit: number,
  ) {
    return this.productsService.findAll(qs, +currentPage, +limit);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Find a product by id')
  findOne(@Param('id') _id: string) {
    return this.productsService.findOne(_id);
  }

  @Post()
  @ResponseMessage('Create a new product')
  create(@User() user: UserInterface, @Body() productDto: CreateProductDto) {
    return this.productsService.create(user, productDto);
  }
  @SkipPermission()
  @Post('many')
  @ResponseMessage('Create list products')
  createMany(@User() user: UserInterface, @Body() productList: any) {
    return this.productsService.createMany(user, productList);
  }

  @Put(':id')
  @ResponseMessage('Update a product by id')
  update(
    @Param('id') _id: string,
    @User() user: UserInterface,
    @Body() productDto: UpdateProductDto,
  ) {
    return this.productsService.update(user, productDto, _id);
  }

  @Delete(':id')
  @ResponseMessage('Delete a product by id')
  delete(@Param('id') _id: string, @User() user: UserInterface) {
    return this.productsService.delete(_id, user);
  }

  @SkipPermission()
  @Put('/image/:id')
  @ResponseMessage('Update images product by id')
  updateImage(
    @Param('id') _id: string,
    @User() user: UserInterface,
    @Body() productDto: UpdateProductDto,
  ) {
    return this.productsService.updateImage(_id, user, productDto);
  }

  @SkipPermission()
  @Get('/image/:name')
  @ResponseMessage('Get a product by name')
  findByName(@Param('name') name: string) {
    return this.productsService.findByName(name);
  }
}
