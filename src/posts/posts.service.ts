import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetPostByIdDto, GetPostsDto } from './dto/post.dto';
import { SkinXPostDatabase } from './database/skinxPost';

@Injectable()
export class PostsService {
  constructor(private readonly skinxPostDataBase: SkinXPostDatabase) {}

  async getPostById(dto: GetPostByIdDto): Promise<any> {
    try {
      return this.skinxPostDataBase.getPostByIdInDB(dto);
    } catch (error) {
      console.log('error: registerUser', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPosts(dto: GetPostsDto): Promise<any> {
    try {
      return this.skinxPostDataBase.getPostsInDB(dto);
    } catch (error) {
      console.log('error: registerUser', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllTags(): Promise<any> {
    try {
      return this.skinxPostDataBase.getAllTagsInDB();
    } catch (error) {
      console.log('error: registerUser', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
