import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SkinXPostDatabase } from './database/skinxPost';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, SkinXPostDatabase, PrismaService],
})
export class PostsModule {}
