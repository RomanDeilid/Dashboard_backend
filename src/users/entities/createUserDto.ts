import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    role: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    password: string;



}