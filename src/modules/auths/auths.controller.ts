import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Public, ResponseMessage, SkipPermission, User } from 'src/decorator/customize';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserInterface } from '../users/users.interface';
import { UsersService } from '../users/users.service';
import { Response, Request as ExpressRequest } from 'express';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login a user')
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    return await this.authsService.login(req.user, res);
  }

  @Public()
  @Post('register')
  @ResponseMessage('Register a new user')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.register(userDto);
  }

  @SkipPermission()
  @Get('refresh')
  @ResponseMessage('Get new access token')
  refresh(
    @User() user: UserInterface,
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authsService.processNewToken(req, res);
  }

  @SkipPermission()
  @ResponseMessage('Get user information')
  @Get('account')
  async handleGetAccount(@User() user: UserInterface) {
    return user;
  }

  @SkipPermission()
  @ResponseMessage('Logout User')
  @Post('logout')
  handleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: UserInterface,
  ) {
    return this.authsService.logout(response, user);
  }
}
