import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UserInterface } from '../users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private OrderModel: SoftDeleteModel<OrderDocument>,
  ) {}
  async create(createOrderDto: CreateOrderDto, user: UserInterface) {
    const {
      description,
      email,

      phone,
      address,
      username,
      productId,
      status,
      quanlity,
    } = createOrderDto;
    return await this.OrderModel.create({
      description,
      email,
      address,
      status,
      phone,
      productId,
      username,
      quanlity,
      createdBy: {
        _id: user._id,
        username: user.username,
      },
    });
  }

  async createMany(user: UserInterface, orderList: any) {
    for (let item of orderList) {
      await this.create(item, user);
    }
    return true;
  }

  async findAll(qs: string, currentPage: number, limit: number) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter['current'];

    const totalItems = await this.OrderModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (currentPage - 1) * limit;

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result: await this.OrderModel.find(filter)
        .skip(offset)
        .limit(limit)
        .sort(sort as any)
        .populate(population)
        .exec(),
    };
  }

  async findOne(_id: string) {
    return await this.OrderModel.findOne({ _id }).populate({
      path: 'productId',
    });
  }

  async remove(id: string, user: UserInterface) {
    await this.OrderModel.softDelete({
      _id: id,
    });
    await this.OrderModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          username: user.username,
        },
      },
    );
    return 'Delete success';
  }

  async update(
    _id: string,
    updateOrderDto: UpdateOrderDto,
    user: UserInterface,
  ) {
    const {
      address,
      description,
      email,
      phone,
      productId,
      username,
      quanlity,
      status,
    } = updateOrderDto;
    return await this.OrderModel.findOneAndUpdate(
      { _id },
      {
        address,
        description,
        status,
        email,
        phone,
        productId,
        username,
        quanlity,
        updatedBy: {
          _id: user._id,
          username: user.username,
        },
      },
    );
  }
}
