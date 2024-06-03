import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../../enums/users';
export class UpdateUserDto {
  @ApiProperty({ example: 'Roma', description: ' уникальное имя пользователя' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  username: string;

  @ApiProperty({ example: 'Xyz1723', description: 'Пароль' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  password: string;
}
