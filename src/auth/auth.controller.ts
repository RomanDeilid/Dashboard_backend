import {Controller, Post, Body, Param, HttpException, HttpStatus, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
const jwt = require('jsonwebtoken');
import { JwtService } from '@nestjs/jwt';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @ApiOperation({ summary: 'авторизация  первичное создания токена' })
  @ApiResponse({ status: 201 })
  @HttpCode(201)
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Неверные учетные данные' };
    }
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'обновление токена' })
  @ApiResponse({ status: 201 })
  @HttpCode(201)
  @Post('/token')
  async verification_token ( @Body() body: { token: string, id: string }) {
    return this.authService.verification_token(body.token, body.id);
  }


}
