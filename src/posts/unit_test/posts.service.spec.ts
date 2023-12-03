import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../posts.service';
import { SkinXPostDatabase } from '../database/skinxPost';
import { PrismaService } from 'src/prisma.service';

describe('PostsService', () => {
  let service: PostsService;
  let skinxPostDataBase: jest.Mocked<SkinXPostDatabase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: SkinXPostDatabase,
          useFactory: () => ({
            getPostsInDB: jest.fn(),
            getAllTagsInDB: jest.fn(),
          }),
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    skinxPostDataBase = module.get(SkinXPostDatabase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPosts', () => {
    it('should return posts', async () => {
      const dto = {
        title: 'all',
        tags: 'all',
        orderBy: 'sorting',
        page: 1,
        pageSize: 34,
      };

      const expectedResponse = {
        totalPosts: 10084,
        totalPages: 297,
        currentPage: 1,
        pageSize: 34,
        posts: [
          {
            id: '000af682-b071-4dd9-83c1-a21fa3940ee1',
            title: 'Cumque natus soluta quam repellat eligendi.',
            content: 'hii',
            postedAt: new Date('2022-05-16T06:26:03.903Z'),
            postedBy: 'Edwina',
            tags: ['hi'],
          },
        ],
      };

      skinxPostDataBase.getPostsInDB.mockResolvedValue(expectedResponse);

      const result = await service.getPosts(dto);

      expect(result).toEqual(expectedResponse);
      expect(skinxPostDataBase.getPostsInDB).toHaveBeenCalledWith(dto);
    });
    it('should handle errors and throw Error', async () => {
      const dto = {
        title: 'all',
        tags: 'all',
        orderBy: 'sorting',
        page: 1,
        pageSize: 34,
      };

      const errorMock = new Error('Mocked error message');
      skinxPostDataBase.getPostsInDB.mockRejectedValue(errorMock);

      await expect(service.getPosts(dto)).rejects.toThrow(Error);
      expect(skinxPostDataBase.getPostsInDB).toHaveBeenCalled();
    });
  });

  describe('getAllTags', () => {
    it('should return all tags', async () => {
      const expectedResponse = ['tag1', 'tag2', 'tag3'];

      skinxPostDataBase.getAllTagsInDB.mockResolvedValue(expectedResponse);

      const result = await service.getAllTags();

      expect(result).toEqual(expectedResponse);
      expect(skinxPostDataBase.getAllTagsInDB).toHaveBeenCalled();
    });

    it('should handle errors and throw Error', async () => {
      const errorMock = new Error('Mocked error message');
      skinxPostDataBase.getAllTagsInDB.mockRejectedValue(errorMock);

      await expect(service.getAllTags()).rejects.toThrow(Error);
      expect(skinxPostDataBase.getAllTagsInDB).toHaveBeenCalled();
    });
  });
});
