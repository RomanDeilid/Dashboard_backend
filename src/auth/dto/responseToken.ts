import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseTokenDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    accessToken: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    refreshToken: string;
}
