import { UserRole } from '../../enums/users';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  readonly role: UserRole;
}
