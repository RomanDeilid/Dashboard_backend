import { UserRole } from '../../enums/users';
import { IsEnum, IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Роль пользователя (Admin, User)',
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  readonly role: UserRole;
}
