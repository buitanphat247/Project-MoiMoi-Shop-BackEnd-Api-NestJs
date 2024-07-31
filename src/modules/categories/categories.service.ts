import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UserInterface } from '../users/users.interface';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { updateCategoryDto } from './dto/update-categories.dto';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private CategoryModel: SoftDeleteModel<CategoryDocument>,
  ) {}
  async findAll(qs: string, currentPage: number, limit: number) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter['current'];

    const totalItems = await this.CategoryModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (currentPage - 1) * limit;

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result: await this.CategoryModel.find(filter)
        .skip(offset)
        .limit(limit)
        .sort(sort as any)
        .populate(population)
        .exec(),
    };
  }

  async findOne(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(
        `Không tìm thấy dữ liệu category có id ${_id}`,
      );
    }
    return await this.CategoryModel.findOne({ _id });
  }

  async create(categoryDto: CreateCategoryDto, user: UserInterface) {
    const isExist =
      (
        await this.CategoryModel.findOne({
          path: categoryDto.path,
        })
      )?.path !== categoryDto.path
        ? true
        : false;
    if (!isExist) {
      throw new BadRequestException('Category đã tồn tại vui lòng tạo mới!');
    }
    return await this.CategoryModel.create({
      ...categoryDto,
      createdBy: {
        _id: user._id,
        username: user.username,
      },
    });
  }

  async update(
    categoryDto: updateCategoryDto,
    user: UserInterface,
    _id: string,
  ) {
    const filter = { _id };
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(
        `Không tìm thấy dữ liệu category có id ${_id}`,
      );
    }
    return await this.CategoryModel.findOneAndUpdate(filter, {
      ...categoryDto,
      updatedBy: {
        _id: user._id,
        username: user.username,
      },
    });
  }
  async delete(_id: string, user: UserInterface) {
    const filter = { _id };
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(
        `Không tìm thấy dữ liệu category có id ${_id}`,
      );
    }
    await this.CategoryModel.softDelete(filter);
    await this.CategoryModel.findOneAndUpdate(filter, {
      deletedBy: {
        _id: user._id,
        name: user.username,
      },
    });
    return 'Delete success';
  }
}
