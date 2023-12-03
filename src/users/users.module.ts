import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/token/token.service';
import { SkinXUserDatabase } from './database/skinxUser';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SkinXUserDatabase, PrismaService, TokenService],
})
export class UsersModule {}
