import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'email',
    example: 'john@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'password',
    example: 'StrongPassword123&',
  })
  password: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'userName',
    example: 'John',
  })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword() // Apply IsStrongPassword only to CreateUserDto
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'password',
    example: 'StrongPassword123&',
  })
  password: string;
}
