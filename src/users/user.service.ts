// @ts-ignore

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import { UserRepository } from './user.repositories';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async findById(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new HttpException(
          ` Bad request, user by ID=${userId} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async createItem(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.createItem(createUserDto);
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  public async updateRoleById(userId: number): Promise<void> {
    await this.userRepository.updateRoleById(userId);
  }

  public async updateById(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = this.userRepository.updateById(userId, updateUserDto);
      if (!user) {
        throw new HttpException(
          ` Bad request, user by ID=${userId} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteById(userId: number): Promise<void> {
    try {
      await this.userRepository.deleteById(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}