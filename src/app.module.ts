import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {SheetModule} from "./sheets/sheet.module";
import {TaskModule} from "./tasks/task.module";
import {CompanyModule} from "./companies/company.module";
import {AuthModule} from "./auth/auth.module";
import {LoggerMiddleware} from "./logger.middleware";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./auth/auth.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),JwtModule.register({
      secret: 'test', //секретный ключ
      signOptions: { expiresIn: '15m' }, // Время жизни токена
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: ['dist/migration/**/*.ts'],
    }),
    UserModule,CompanyModule, TaskModule, SheetModule, ConfigModule,AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

// export class AppModule{}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware) // Применяем middleware
        .exclude('api/v1/auth/login','api/v1/auth/token')
        .forRoutes( '*') // Применяем ко всем маршрутам
  }
}