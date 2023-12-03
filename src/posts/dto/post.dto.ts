import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetPostByIdDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'id',
    example: '6f8aa1f4-edf7-4859-9688-6b575ac6f07d',
  })
  id: string;
}

export class GetPostsDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'title',
    example: 'hello',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'tags',
    example: 'all',
  })
  tags = 'all';

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'orderBy',
    example: 'sorting',
  })
  orderBy = 'sorting';

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  @ApiProperty({
    type: Number,
    name: 'page',
    example: 1,
  })
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  @ApiProperty({
    type: Number,
    name: 'pageSize',
    example: 10,
  })
  pageSize: number;
}
