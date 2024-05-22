import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
