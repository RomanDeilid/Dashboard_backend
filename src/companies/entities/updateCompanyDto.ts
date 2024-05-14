import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './createCompanyDto';
export class UpdateCompanyDto extends PartialType(CreateCompanyDto){}
