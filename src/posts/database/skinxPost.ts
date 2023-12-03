import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetPostByIdDto, GetPostsDto } from '../dto/post.dto';

@Injectable()
export class SkinXPostDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async getPostByIdInDB(idDto: GetPostByIdDto) {
    const { id } = idDto;
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async getPostsInDB(searchDto: GetPostsDto) {
    const { title, tags, orderBy } = searchDto;
    let { page, pageSize } = searchDto;
    page = page || 1;
    pageSize = pageSize || 34;

    let whereCondition = {};

    if (title && title.toLowerCase() !== 'all') {
      whereCondition = {
        ...whereCondition,
        title: {
          contains: title,
        },
      };
    }

    if (tags && tags !== 'all') {
      whereCondition = {
        ...whereCondition,
        tags: {
          has: tags,
        },
      };
    }

    const totalPosts = await this.prisma.post.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalPosts / pageSize);

    const skip = (page - 1) * pageSize;

    const posts = await this.prisma.post.findMany({
      where: whereCondition,
      orderBy:
        orderBy === 'oldest'
          ? { postedAt: 'asc' }
          : orderBy === 'newest'
          ? { postedAt: 'desc' }
          : undefined,
      skip,
      take: pageSize,
    });

    return {
      totalPosts,
      totalPages,
      currentPage: page,
      pageSize,
      posts,
    };
  }

  async getAllTagsInDB(): Promise<string[]> {
    const posts = await this.prisma.post.findMany();
    const allTags: string[] = posts.flatMap((post) => post.tags);
    const uniqueTags = Array.from(new Set(allTags));

    return uniqueTags;
  }
}
