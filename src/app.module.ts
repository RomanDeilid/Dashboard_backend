import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./users/user.module";
import {join} from "path"
import { TaskModule } from "./tasks/task.module";

import {ConfigModule} from "@nestjs/config";
import databaseConfig from "./database.config";



@Module({
  imports: [ConfigModule.forRoot({ load: [databaseConfig] }),  TypeOrmModule.forRoot(databaseConfig()),UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}