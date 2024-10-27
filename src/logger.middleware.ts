import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`Request... ${req.method} ${req.originalUrl}`);
        const token = req.headers['authorization']?.split(' ')[1]; // Получаем токен из заголовка

        if (!token) {
            throw new HttpException('Токен не предоставлен', HttpStatus.UNAUTHORIZED);
        }

        try {
            const decoded = this.jwtService.verify(token); // Проверяем токен
            req = decoded; // Сохраняем информацию о пользователе в запросе
            // console.log(req)
            next(); // Передаем управление следующему middleware или обработчику
        } catch (error) {
            throw new HttpException('Неверный токен', HttpStatus.UNAUTHORIZED);
        }
    }
}