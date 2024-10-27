import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class ResponseToken {

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    accessToken: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    refreshToken: string;
}
