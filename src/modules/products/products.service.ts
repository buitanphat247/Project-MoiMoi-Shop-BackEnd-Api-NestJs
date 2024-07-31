import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UserInterface } from '../users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private ProductModel: SoftDeleteModel<ProductDocument>,
  ) {}
  async findAll(qs: string, currentPage: number, limit: number) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter['current'];

    const totalItems = await this.ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (currentPage - 1) * limit;

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result: await this.ProductModel.find(filter)
        .skip(offset)
        .limit(limit)
        .sort(sort as any)
        .populate(population)
        .exec(),
    };
  }
  async findOne(_id: string) {
    return await this.ProductModel.findOne({ _id }).populate({
      path: 'categories',
      select: {
        name: 1,
      },
    });
  }

  async create(user: UserInterface, productDto: CreateProductDto) {
    const { categories, description, discount, images, name, price, quanlity } =
      productDto;
    return await this.ProductModel.create({
      categories,
      description,
      discount,
      images,
      name,
      price,
      quanlity,
      createdBy: {
        _id: user._id,
        username: user.username,
      },
    });
  }

  async createMany(user: UserInterface, productList: any) {
    for (let item of productList) {
      await this.create(user, item);
    }
    return true;
  }

  async delete(_id: string, user: UserInterface) {
    const filter = { _id };
    await this.ProductModel.softDelete(filter);
    await this.ProductModel.findOneAndUpdate(filter, {
      deletedBy: {
        _id: user._id,
        name: user.username,
      },
    });
    return 'Delete success';
  }
  async updateImage(
    _id: string,
    user: UserInterface,
    productDto: UpdateProductDto,
  ) {
    const { images } = productDto;
    return await this.ProductModel.findOneAndUpdate(
      { _id },
      {
        images,
        updatedBy: {
          _id: user._id,
          username: user.username,
        },
      },
    );
  }
  async findByName(name: string) {
    return await this.ProductModel.find().where('images.name').equals(name);
  }
  async update(user: UserInterface, productDto: UpdateProductDto, _id) {
    const { categories, description, discount, images, name, price, quanlity } =
      productDto;
    return await this.ProductModel.findOneAndUpdate(
      { _id },
      {
        categories,
        description,
        discount,
        images,
        name,
        price,
        quanlity,
      },
    );
  }
}
