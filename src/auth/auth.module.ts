import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'
import {UserModule} from '../users/user.module';
// import {AuthRepository} from "./auth.repositories"; // Импортируйте модуль

@Module({
  imports: [ UserModule ,JwtModule.register({
    secret: 'test', //секретный ключ
    signOptions: { expiresIn: '15m' }, // Время жизни токена
  }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
