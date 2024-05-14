import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Company} from "./entities/company.entity";
import {CompanyRepository} from "./company.repositories";

@Module({
  imports:[TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {
}