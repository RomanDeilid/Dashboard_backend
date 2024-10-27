import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as  bcrypt from "bcrypt"
export class CreateUserDto {
  @ApiProperty({ example: 'Roma', description: ' уникальное имя пользователя' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  username: string;

  @ApiProperty({ example: 'Xyz1723', description: 'Пароль' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  password: string;

}
