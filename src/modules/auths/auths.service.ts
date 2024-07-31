import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../users/users.interface';
import { ConfigService } from '@nestjs/config';
import { Request as ExpressRequest, Response } from 'express';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthsService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    private roleService: RolesService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.find_by_email(email);
    if (user && this.usersService.check_password(password, user?.password)) {
      const { _id } = user.role as any;
      const { permissions } = await this.roleService.findOne(_id.toString());
      const userObject = user.toObject();
      return {
        ...userObject,
        permissions,
      };
    }

    return null;
  }

  async login(user: UserInterface, res: Response) {
    const {
      _id,
      email,
      role,
      username,
      address,
      age,
      phone,
      gender,
      permissions,
    } = user;
    const payload = { _id, email, role, username, address, age, phone, gender };
    const refresh_token = await this.createRefresthToken(payload);
    const access_token = await this.createRefresthToken(payload);
    await this.usersService.update_refreshToken(
      refresh_token,
      _id.toString(),
      username,
    );
    res.cookie('refresh_token', refresh_token);
    return {
      access_token,
      meta: {
        _id,
        email,
        role,
        username,
        address,
        age,
        phone,
        gender,
        permissions,
      },
    };
  }

  async createRefresthToken(payload: any) {
    const refresthToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });
    return refresthToken;
  }
  async createAccessToken(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });
    return accessToken;
  }

  async processNewToken(req: ExpressRequest, res: Response) {
    const refresh_token = req.cookies['refresh_token'];

    try {
      const payload = this.jwtService.verify(refresh_token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });
      const user = await this.usersService.find_by_token(refresh_token);
      if (user) {
        const { _id, email, role, username, address, age, phone, gender } =
          user;
        const payload = {
          _id,
          email,
          role,
          username,
          address,
          age,
          phone,
          gender,
        };
        const refresh_token = await this.createRefresthToken(payload);
        const access_token = await this.createAccessToken(payload);
        await this.usersService.update_refreshToken(
          refresh_token,
          _id.toString(),
          username,
        );
        res.cookie('refresh_token', refresh_token);
        return {
          access_token,
          meta: {
            _id,
            username,
            email,
            role,
          },
        };
      } else {
        throw new BadRequestException(
          `Refresh token không hợp lệ. Vui lòng login lại!`,
        );
      }
    } catch (e) {
      throw new BadRequestException(
        `Refresh token không hợp lệ. Vui lòng login lại!`,
      );
    }
  }

  async logout(response: Response, user: UserInterface) {
    await this.usersService.update_refreshToken(
      '',
      user._id.toString(),
      user.username,
    );
    response.clearCookie('refresh_token');
    return 'ok';
  }
}
