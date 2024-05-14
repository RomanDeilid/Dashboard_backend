import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
export enum Role {
    ADMIN='Admin',
    USER='User',
}
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    role: Role;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    password: string;
}