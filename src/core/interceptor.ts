import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseMessage } from 'src/decorator/customize';

export interface Response<T> {
  data: T;
  statusCode: number;
  message: string; // Thêm trường message vào interface Response
}

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const message = Reflect.getMetadata(
      'responseMessage',
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: message || 'Default message', // Sử dụng thông báo mặc định nếu không có metadata
      })),
    );
  }
}
