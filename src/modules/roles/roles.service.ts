import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { UserInterface } from '../users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private RoleModel: SoftDeleteModel<RoleDocument>,
  ) {}
  async create(createRoleDto: CreateRoleDto, user: UserInterface) {
    const { name, permissions } = createRoleDto;
    return this.RoleModel.create({
      name,
      permissions,
      createdBy: {
        _id: user._id,
        username: user.username,
      },
    });
  }

  async findAll(qs: string) {
    return this.RoleModel.find({});
  }

  async findOne(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Không tìm thấy dữ liệu role có id ${_id}`);
    }
    return this.RoleModel.findOne({ _id }).populate({
      path: 'permissions',
      select: {
        _id: 1,
        apiPath: 1,
        method: 1,
        module: 1,
        name: 1,
      },
    });
  }

  async update(_id: string, updateRoleDto: UpdateRoleDto, user: UserInterface) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Không tìm thấy dữ liệu role có id ${_id}`);
    }
    const { name, permissions } = updateRoleDto;
    return await this.RoleModel.updateOne(
      { _id },
      {
        name,
        permissions,
        updatedBy: {
          _id: user._id,
          username: user.username,
        },
      },
    );
  }

  async remove(id: string, user: UserInterface) {
    const foundRole = await this.RoleModel.findById(id);
    if (foundRole.name === 'ADMIN') {
      throw new BadRequestException('Không thể xóa role ADMIN');
    }
    await this.RoleModel.softDelete({
      _id: id,
    });
    await this.RoleModel.updateOne(
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
}
