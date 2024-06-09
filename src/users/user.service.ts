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
        throw new Error(` Bad request, user by ID=${userId} not found`);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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

  public async setRoleById(userId: number, userRole: string): Promise<void> {
    try {
      const setUser = await this.userRepository.setRoleById(userId, userRole);
      if (!setUser) {
        throw new Error(` Bad request, user by ID=${userId} not found`);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateById(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    try {
      const updateUser = await this.userRepository.updateById(
        userId,
        updateUserDto,
      );
      if (!updateUser) {
        throw new Error(` Bad request, user by ID=${userId} not found`);
      }
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  public async deleteById(userId: number): Promise<void> {
    try {
      const deletUser = await this.userRepository.deleteById(userId);
      if (!deletUser) {
        throw new Error(` Bad request, user by ID=${userId} not found`);
      } else {
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
