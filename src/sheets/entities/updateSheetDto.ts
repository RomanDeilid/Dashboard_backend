import { PartialType } from '@nestjs/mapped-types';
import { CreateSheetDto } from './createSheetDto';
export class UpdateSheetDto extends PartialType(CreateSheetDto){}
