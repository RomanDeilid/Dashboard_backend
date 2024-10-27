import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserRoleDto } from './dto/updateUserRoleDto';

@ApiTags('Users')
@Controller('/api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}


  @ApiOperation({ summary: 'просмотр всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  public async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'просмотр одного пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  public async findById(@Param('id') userId: number): Promise<User> {
    return await this.userService.findById(userId);
  }

  @ApiOperation({ summary: 'создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createItem(createUserDto);
  }

  @ApiOperation({ summary: 'Обновления пользователя по ID' })
  @ApiResponse({ status: 200 })
  @Put('/:id')
  public async updateById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') userId: number
  ): Promise<void> {
    await   this.userService.updateById(userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Задать роль для пользователя по ID' })
  @ApiResponse({ status: 200 })
  @Patch('/roles/:id')
  public async setRoleById(
    @Body() updateUserRole: UpdateUserRoleDto,
    @Param('id') userId: number
  ): Promise<void> {
    await this.userService.setRoleById(userId, updateUserRole);
  }




  @ApiOperation({ summary: 'удаление пользователя по ID' })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  @HttpCode(204)
  public async deleteById(@Param('id') userId: number): Promise<void> {
    await this.userService.deleteById(userId);
  }
}
