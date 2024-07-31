import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { UserInterface } from '../users/users.interface';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ResponseMessage('Create a new permission')
  create(
    @Body() createPermissionDto: CreatePermissionDto,
    @User() user: UserInterface,
  ) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Post('create_many')
  @ResponseMessage('Create new permissions')
  createMany(@Body() createPermissionDto: any, @User() user: UserInterface) {
    return this.permissionsService.createMany(createPermissionDto, user);
  }

  @Public()
  @Get()
  @ResponseMessage('Find all permission')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Public()
  @Get('/:id')
  @ResponseMessage('Find a permission by id')
  findOne(@Param('id') _id: string) {
    return this.permissionsService.findOne(_id);
  }

  @Put('/:id')
  @ResponseMessage('Update a permission by id')
  update(
    @Param('id') _id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @User() user: UserInterface,
  ) {
    return this.permissionsService.update(_id, updatePermissionDto, user);
  }

  @Delete('/:id')
  @ResponseMessage('Delete a user by id')
  delete(@Param('id') _id: string, @User() user: UserInterface) {
    return this.permissionsService.delete(_id, user);
  }
}
