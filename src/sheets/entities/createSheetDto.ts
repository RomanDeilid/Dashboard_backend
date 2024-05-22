import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateSheetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
