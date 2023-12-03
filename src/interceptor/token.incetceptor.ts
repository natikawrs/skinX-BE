import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from 'src/token/constants';

export interface ITokenInfo {
  user_id: string;
}

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException('YOU_ARE_UNAUTHORIZE');
    }

    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('YOU_ARE_UNAUTHORIZE');
    }

    const secretValue = jwtConstants.secret;
    const TokenJson: any = verify(token, secretValue);
    if (!TokenJson.user_id) {
      throw new UnauthorizedException('YOU_ARE_UNAUTHORIZE');
    }

    request['user_info'] = TokenJson;

    return next.handle();
  }
}
