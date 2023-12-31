import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { TokenService } from 'src/token/token.service';
import { SkinXUserDatabase } from '../database/skinxUser';
import { PrismaService } from 'src/prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, TokenService, SkinXUserDatabase, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
