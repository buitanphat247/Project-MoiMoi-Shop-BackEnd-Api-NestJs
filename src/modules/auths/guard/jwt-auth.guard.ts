import {
  BadGatewayException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {
  IS_PUBLIC_KEY,
  IS_PUBLIC_PERMISSION_KEY,
} from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { path } = request.route;
    const { method } = request;
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Token không hợp lệ or không có token ở Bearer Token ở Header request!',
        )
      );
    }
    const isSkipPermission = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
   
    if (!isSkipPermission) {
      const permission_of_user = user.permissions;
      let check_permisison = false;
      permission_of_user.map((item_permission_user) => {
        if (
          item_permission_user.apiPath === path &&
          item_permission_user.method === method
        ) {
          check_permisison = true;
        }
      });
      if (check_permisison === false) {
        throw new UnauthorizedException(
          'User không có quyền truy cập endpoint này',
        );
      }
    }
    return user;
  }
}
