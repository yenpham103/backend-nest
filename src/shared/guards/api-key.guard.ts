import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import envConfig from '../config'

@Injectable()
export class ApiKeyGuard implements CanActivate {
   canActivate(context: ExecutionContext): boolean{
    const request = context.switchToHttp().getRequest()
    const xAPIKEY = request.headers['x-api-key']

    if(xAPIKEY !== envConfig.SECRET_API_KEY) {
        throw new UnauthorizedException()
    }

    return true
   
  }
}