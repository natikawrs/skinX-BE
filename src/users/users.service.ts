import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { SkinXUserDatabase } from './database/skinxUser';

@Injectable()
export class UsersService {
  constructor(
    private readonly skinxUserDataBase: SkinXUserDatabase,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<any> {
    try {
      return await this.skinxUserDataBase.createUserinDB(dto);
    } catch (error) {
      console.log('error: registerUser', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(dto: LoginUserDto): Promise<any> {
    try {
      const user = await this.skinxUserDataBase.findOneByEmailinDB(dto.email);

      if (!user || user === undefined) {
        // User not found, throw a 400 status exception
        throw new HttpException(
          { message: 'Invalid email or password' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const matchPassword = await bcrypt.compare(dto.password, user.password);

      if (matchPassword) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new HttpException(
          { message: 'Invalid email or password' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.log('error: validateUser', error);
      throw error;
    }
  }

  async loginUser(dto: LoginUserDto): Promise<any> {
    try {
      const user = await this.validateUser(dto);
      const payload = { user_id: user.id };
      const expiresIn = '1h';
      const token = await this.tokenService.generateToken(payload, expiresIn);
      console.log('token', token);
      //return
      const userWithToken = {
        token,
        user: {
          id: user.id,
          email: user.email,
          userName: user.userName,
        },
      };

      return userWithToken;
    } catch (error) {
      console.log('error: login', error);

      // Check if it's an HttpException and has a status property
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;

      throw new HttpException(
        { message: error.message },
        status, // Use the original status code
      );
    }
  }
}
