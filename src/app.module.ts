import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { join } from 'path';
import { TaskModule } from './tasks/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.BD_PORT,
      username: process.env.BD_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: ['dist/migration/**/*.ts'],
    }),
    UserModule,
    // TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
