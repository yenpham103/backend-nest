
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => {  // đoạn này xử lý trước khi controller chạy
            const ctx = context.switchToHttp();  // đoạn này đến return : Xử lý khi controller chạy xong rồi, trước khi trả về cho client
            const response = ctx.getResponse();
            const statusCode = response.statusCode;
            return { data, statusCode }
        }));
    }
}
