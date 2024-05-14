import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
export enum Status {
    Expired='Просрочен',
    WORK='В работе',
    COMPLETED="Выполнен",
    WAIT="Ожидает действий"
}
export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    status: Status;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;
}