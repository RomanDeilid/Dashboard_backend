import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import {TaskStatus} from "../../enums/tasks";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    status: TaskStatus;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;
}