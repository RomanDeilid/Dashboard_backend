import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

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
