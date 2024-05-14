import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete, NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import {UserService} from "./user.service";

@Controller('/api/v1/users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  public async findAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get('/:Id')
  public async findOne(@Param('Id') userId: number): Promise<User> {
  return await this.userService.getByFilters(userId);
  }

  @Post()
  public async create(
      @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Patch('/:Id')
  public async update(
      @Body() updateUserDto: UpdateUserDto,
      @Param('Id') userId: number,
  ): Promise<User> {

    return await this.userService.updateById(
        userId,
        updateUserDto,
    )
  }

  @Delete('/:Id')
  public async delete(@Param('Id') userId: number): Promise<void> {
    await this.userService.deleteById(userId);
  }
}