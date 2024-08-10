import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UserInterface } from './users.interface';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: SoftDeleteModel<UserDocument>,
  ) {}

  hash_password(password: string) {
    var salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  check_password(password: string, password_hashed: string) {
    return compareSync(password, password_hashed);
  }

  async findAll(qs: string, currentPage: number, limit: number) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter['current'];

    const totalItems = await this.UserModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (currentPage - 1) * limit;

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result: await this.UserModel.find(filter)
        .skip(offset)
        .limit(limit)
        .sort(sort as any)
        .populate(population)
        .exec(),
    };
  }

  async findOne(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Không tìm thấy dữ liệu role có id ${_id}`);
    }
    return await this.UserModel.findOne({ _id }).populate({
      path: 'role',
      select: {
        name: 1,
        id: 1,
      },
    });
  }

  async register(userDto: CreateUserDto) {
    const { age, email, password, phone, username, address, gender } = userDto;
    const isExist = (await this.UserModel.findOne({ email })) ? false : true;
    if (!isExist) {
      throw new BadGatewayException(
        `Email ${email} đã tồn tại, vui lòng tạo bằng email khác!`,
      );
    }
    return await this.UserModel.create({
      age,
      email,
      password: this.hash_password(password),
      phone,
      address,
      gender,
      role: '66982c969affcd035649a8d7',
      username,
    });
  }

  async createManyUser(userList: any) {
    for (let item of userList) {
      await this.register(item);
    }
    return true;
  }

  async update(userDto: UpdateUserDto, _id: string, user: UserInterface) {
    const { age, email, phone, username, address, gender } = userDto;
    const isExist = await this.UserModel.findOne({ email });
    if (isExist !== null && isExist.id !== _id) {
      throw new BadGatewayException(
        `Email ${email} đã tồn tại, vui lòng cập nhật bằng email khác!`,
      );
    }
    return await this.UserModel.findOneAndUpdate(
      { _id },
      {
        age,
        email,
        phone,
        gender,
        username,
        address,
        updatedBy: {
          _id: user._id,
          name: user.username,
        },
      },
    );
  }

  async delete(_id: string, user: UserInterface) {
    const filter = { _id };
    const user_by_id = (await this.findOne(_id)) as any;
    let isExist = user_by_id.role.name !== 'ADMIN' ? true : false;
    if (!isExist) {
      throw new BadGatewayException(
        `Bạn không có quyền để xóa tài khoản có email là ${user_by_id.email}!`,
      );
    }
    await this.UserModel.softDelete(filter);
    await this.UserModel.findOneAndUpdate(filter, {
      deletedBy: {
        _id: user._id,
        name: user.username,
      },
    });
    return 'Delete success';
  }

  async find_by_email(email: string) {
    const user = await this.UserModel.findOne({ email }).populate({
      path: 'role',
      select: {
        _id: 1,
        name: 1,
      },
    });
    return user;
  }

  async find_by_token(token: string) {
    const user = await this.UserModel.findOne({ refreshToken: token }).populate(
      {
        path: 'role',
        select: {
          _id: 1,
          name: 1,
        },
      },
    );
    return user;
  }

  async update_refreshToken(refreshToken: any, _id: string, username: string) {
    const filter = { _id };
    return await this.UserModel.findOneAndUpdate(filter, {
      refreshToken,
      updatedBy: {
        _id,
        username,
      },
    });
  }
}
