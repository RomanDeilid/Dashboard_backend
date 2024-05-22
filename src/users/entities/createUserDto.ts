import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../enums/users';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example:"Roma",description:" уникальное имя пользователя"})
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  username: string;

  @ApiProperty({example:"Admin",description:"Роль пользователя (Admin, User)"})
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  role: Role;

  @ApiProperty({example:"Xyz1723",description:"Пароль"})
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  password: string;
}
