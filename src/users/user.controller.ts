import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import {UserService} from "./user.service";

@Controller('/api/v1/users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  public async findAll_user(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/:Id')
  public async findById_user(@Param('Id') userId: number): Promise<User> {
  return await this.userService.findById(userId);
  }

  @Post()
  public async create_user(
      @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.createItem(createUserDto);
  }

  @Patch('/:Id')
  public async update_user(
      @Body() updateUserDto: UpdateUserDto,
      @Param('Id') userId: number,
  ): Promise<User> {

    return await this.userService.updateById(
        userId,
        updateUserDto,
    )
  }

  @Delete('/:Id')
  public async delete_user(@Param('Id') userId: number): Promise<void> {
    await this.userService.deleteById(userId);
  }
}