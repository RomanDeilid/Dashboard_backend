import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateSheetDto {
  @ApiProperty({ example: 'Roma', description: 'имя доски' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty({ example: 'Задача по фронт для Ромы', description: 'описание доски задач' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
