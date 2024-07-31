import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ResponseMessage = (message: string) =>
  SetMetadata('responseMessage', message);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const IS_PUBLIC_PERMISSION_KEY = 'isPublicPermission';
export const SkipPermission = () => SetMetadata(IS_PUBLIC_PERMISSION_KEY, true);
