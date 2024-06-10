import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { UserRepository } from './user.repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserRoleDto } from './dto/updateUserRoleDto';

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
        throw new Error();
      }

      return user;
    } catch (error) {
      throw new HttpException(
        ` Bad request, user by ID=${userId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async createItem(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.createItem(createUserDto);
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException(
          'Bad request, this user already exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  public async setRoleById(
    userId: number,
    { role }: UpdateUserRoleDto,
  ): Promise<void> {
    try {
      const setUser = await this.userRepository.setRoleById(userId, role);
      if (!setUser) {
        throw new Error();
      }
    } catch (error) {
      throw new HttpException(
        ` Bad request, user by ID=${userId} not found`,
        HttpStatus.BAD_REQUEST,
      );
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
        throw new Error();
      }
    } catch (error) {
      if (error.code == '23505') {
        console.log(error);
        throw new HttpException(
          'Bad request, this user already exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          ` Bad request, user by ID=${userId} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  public async deleteById(userId: number): Promise<void> {
    try {
      const deletUser = await this.userRepository.deleteById(userId);
      if (!deletUser) {
        throw new Error();
      } else {
      }
    } catch (error) {
      throw new HttpException(
        `Bad request, user by ID=${userId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
