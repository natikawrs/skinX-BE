import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class SkinXUserDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async createUserinDB(dto: CreateUserDto) {
    // Check if the email already exists
    const existingUser = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const createdUser = await this.prisma.user.create({
      data: {
        userName: dto.userName,
        email: dto.email,
        password: hashedPassword,
      },
    });

    if (!createdUser) {
      throw new NotFoundException('User not created');
    }

    return createdUser;
  }

  async findOneByEmailinDB(email: string) {
    return this.prisma.user.findFirst({
      where: { email: email },
    });
  }
}
