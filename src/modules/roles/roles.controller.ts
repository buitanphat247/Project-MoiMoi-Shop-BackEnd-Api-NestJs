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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { UserInterface } from '../users/users.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Post()
  @ResponseMessage('Create a new role')
  create(@Body() createRoleDto: CreateRoleDto, @User() user: UserInterface) {
    return this.rolesService.create(createRoleDto, user);
  }

  @Get()
  @ResponseMessage('Get all roles')
  findAll(@Query() qs: string) {
    console.log('qs: ', qs);
    return this.rolesService.findAll(qs);
  }

  @Get(':id')
  @ResponseMessage('Get a role by id')
  findOne(@Param('id') _id: string) {
    return this.rolesService.findOne(_id);
  }

  @Put(':id')
  @ResponseMessage('Update a role by id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @User() user: UserInterface,
  ) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a role by id')
  remove(@Param('id') id: string, @User() user: UserInterface) {
    return this.rolesService.remove(id, user);
  }
}
