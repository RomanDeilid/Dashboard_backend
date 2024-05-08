import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto';
import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {

}
