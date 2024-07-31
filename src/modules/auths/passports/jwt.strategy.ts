import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserInterface } from 'src/modules/users/users.interface';
import { RolesService } from 'src/modules/roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private rolesService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: UserInterface) {
    const { role } = payload;
    const dataRole = await this.rolesService.findOne(role._id.toString());
    const { permissions } = dataRole;
    // console.log('permissions: ', permissions);
    return {
      ...payload,
      permissions: permissions,
    };
  }
}
