import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateCompanyDto {

  @ApiProperty({ example: 'R-Game', description: ' уникальное имя компании' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  name: string;

  @ApiProperty({ example: 'компания для создания игрушек', description: 'описание' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
