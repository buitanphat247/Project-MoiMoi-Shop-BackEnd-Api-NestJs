import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './schema/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserInterface } from '../users/users.interface';
import slugify from 'slugify';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private PermissionModel: SoftDeleteModel<PermissionDocument>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto, user: UserInterface) {
    const { apiPath, description, module, name, method } = createPermissionDto;
    const isExist = (await this.PermissionModel.findOne({
      apiPath,
      module,
      method,
    }))
      ? false
      : true;
    if (!isExist) {
      throw new BadRequestException('Permission đã tồn tại vui lòng tạo mới!');
    }
    return await this.PermissionModel.create({
      apiPath,
      description,
      module,
      method,
      name,
      createdBy: {
        _id: user._id,
        username: user.username,
      },
    });
  }

  async createMany(createPermissions: any, user: UserInterface) {
    createPermissions.map((item, index) => {
      const { apiPath, module, name, method } = item;
      const description = slugify(name, { lower: true, replacement: '_' });
      this.PermissionModel.create({
        apiPath,
        module,
        name,
        method,
        description,
        createdBy: {
          _id: user._id,
          username: user.username,
        },
      });
    });
  }

  async findAll() {
    return await this.PermissionModel.find({});
  }

  async findOne(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(
        `Không tìm thấy dữ liệu permission có id ${_id}`,
      );
    }
    return await this.PermissionModel.findOne({ _id });
  }

  async update(
    _id: string,
    updatePermissionDto: UpdatePermissionDto,
    user: UserInterface,
  ) {
    const { apiPath, description, method, module, name } = updatePermissionDto;
    return await this.PermissionModel.findOneAndUpdate(
      { _id },
      {
        apiPath,
        description,
        method,
        module,
        name,
        updatedBy: {
          _id: user._id,
          username: user.username,
        },
      },
    );
  }

  async delete(_id: string, user: UserInterface) {
    const filter = { _id };
    await this.PermissionModel.softDelete(filter);
    await this.PermissionModel.findOneAndUpdate(filter, {
      deletedBy: {
        _id: user._id,
        name: user.username,
      },
    });
    return 'Delete success';
  }
}
