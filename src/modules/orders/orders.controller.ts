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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  Public,
  ResponseMessage,
  SkipPermission,
  User,
} from 'src/decorator/customize';
import { UserInterface } from '../users/users.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ResponseMessage('Create a new order')
  create(@Body() createOrderDto: CreateOrderDto, @User() user: UserInterface) {
    return this.ordersService.create(createOrderDto, user);
  }

  @SkipPermission()
  @Post('many')
  @ResponseMessage('Create list orders')
  createMany(@User() user: UserInterface, @Body() orderList: any) {
    return this.ordersService.createMany(user, orderList);
  }


  
  @Public()
  @ResponseMessage('Get all orders')
  @Get()
  findAll(
    @Query() qs: string,
    @Query('limit') limit: number,
    @Query('current') currentPage: number,
  ) {
    return this.ordersService.findAll(qs, +currentPage, +limit);
  }

  @Public()
  @ResponseMessage('Get a order by id')
  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.ordersService.findOne(_id);
  }

  @Put(':id')
  @ResponseMessage('Update a order by id')
  update(
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id') _id: string,
    @User() user: UserInterface,
  ) {
    return this.ordersService.update(_id, updateOrderDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a order by id')
  remove(@Param('id') id: string, @User() user: UserInterface) {
    return this.ordersService.remove(id, user);
  }
}
