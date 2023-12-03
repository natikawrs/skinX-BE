import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';

@ApiTags('[Authen]')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiExtraModels(CreateUserDto)
  @HttpCode(HttpStatus.OK)
  async createUserController(@Body() dto: CreateUserDto) {
    return await this.usersService.registerUser(dto);
  }

  @Post('login')
  @ApiExtraModels(LoginUserDto)
  @HttpCode(HttpStatus.OK)
  async loginController(@Body() body: LoginUserDto) {
    try {
      return await this.usersService.loginUser(body);
    } catch (e) {
      throw e;
    }
  }
}
