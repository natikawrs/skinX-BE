import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class TokenService {
  generateToken(payload: object, expiresIn: string): string {
    const secretValue = jwtConstants.secret;
    return sign(payload, secretValue, { expiresIn });
  }

  validateToken(token: string) {
    try {
      const secretValue = jwtConstants.secret;
      const payload = verify(token, secretValue);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
