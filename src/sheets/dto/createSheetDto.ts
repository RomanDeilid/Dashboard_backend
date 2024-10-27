import {IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Status} from "../../enums/status";
import {Company} from "../../companies/entities/company.entity";

export class CreateSheetDto {
  @ApiProperty({ example: 'Roma', description: 'имя доски' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty({ example: 'Todo', description: 'статус задачи' })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  constructor(partial: Partial<CreateSheetDto>) {
    Object.assign(this, partial);
    if (!this.status) {
      this.status = Status.TODO;
    }
  }


  @ApiProperty({ example: 'Задача по фронт для Ромы', description: 'описание доски задач' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;



@ApiProperty({ example: '2', description: 'айди компаний' })
@IsNotEmpty()
company: Company;

}

