import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service'; // Импортируйте сервис пользователей
import { User } from '../users/entities/user.entity'; // Импортируйте сущность пользователя
import * as bcrypt from 'bcrypt';
import {ResponseToken} from "./entity/responseToken";
let blacklistedTokens = [];
@Injectable()
export class AuthService {
  constructor(
      private usersService: UserService,
      private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {  id: user.id,iat: Math.floor((Date.now() / 1000) )  };
    const token=new ResponseToken()
    token.accessToken=this.jwtService.sign(payload, { expiresIn: '1m' });
    token.refreshToken=this.jwtService.sign(payload, { expiresIn: '1h' });
    return token;
  }


  async verification_token(refresh: string,id:string) {

      if (!refresh) {
        throw new HttpException('Токен не предоставлен', HttpStatus.UNAUTHORIZED);
      }
      if (blacklistedTokens.includes(refresh)) {
      throw new HttpException('Токен заблокирован', HttpStatus.UNAUTHORIZED);
     }
      try {
        // Проверка токена
        const decoded = this.jwtService.verify(refresh);
        console.log(decoded)
        blacklistedTokens.push(refresh);
        const token=new ResponseToken()
        const payload = {  id: id,iat: Math.floor((Date.now() / 1000) )  };
        token.accessToken=this.jwtService.sign(payload,{ expiresIn: '1m' });
        token.refreshToken=this.jwtService.sign(payload, { expiresIn: '1h' });
        return token;
      } catch (err) {
        // console.log(err.message ,"Токен недействителен")
        throw new HttpException('Токен не недействителен', HttpStatus.UNAUTHORIZED);
      }
  }

}
