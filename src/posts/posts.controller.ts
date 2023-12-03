import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetPostByIdDto, GetPostsDto } from './dto/post.dto';
import { TokenInterceptor } from 'src/interceptor/token.incetceptor';

@ApiTags('[Post]')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(TokenInterceptor)
  @Get('/getPostById/:id')
  @ApiExtraModels(GetPostByIdDto)
  @HttpCode(HttpStatus.OK)
  async getPostByIdController(@Param() param: GetPostByIdDto) {
    return await this.postsService.getPostById(param);
  }

  @UseInterceptors(TokenInterceptor)
  @Get('/getPosts/:title/:tags/:orderBy/:page/:pageSize')
  @ApiExtraModels(GetPostsDto)
  @HttpCode(HttpStatus.OK)
  async searchPostsByTitleController(
    @Param('title') title: string,
    @Param('tags') tags: string,
    @Param('orderBy') orderBy: string,
    @Param('page', ParseIntPipe) page: number,
    @Param('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const paramDto: GetPostsDto = {
      title,
      tags,
      orderBy,
      page,
      pageSize,
    };
    return await this.postsService.getPosts(paramDto);
  }

  @UseInterceptors(TokenInterceptor)
  @Get('/getAllTags')
  @HttpCode(HttpStatus.OK)
  async getAllTagsController() {
    return await this.postsService.getAllTags();
  }
}
