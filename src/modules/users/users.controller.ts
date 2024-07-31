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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { UserInterface } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  @ResponseMessage('Find all users')
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Find a user by id')
  findOne(@Param('id') _id: string) {
    return this.usersService.findOne(_id);
  }

  @Put(':id')
  @ResponseMessage('Update a user by id')
  update(
    @Body() userDto: UpdateUserDto,
    @Param('id') _id: string,
    @User() user: UserInterface,
  ) {
    return this.usersService.update(userDto, _id, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a user by id')
  delete(@Param('id') _id: string, @User() user: UserInterface) {
    return this.usersService.delete(_id, user);
  }
}
