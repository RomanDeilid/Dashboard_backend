import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {join} from "path";


export default registerAs(
    'database',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: process.env.HOST,
        port: +process.env.PORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        autoLoadEntities: true,
        synchronize: true,
        entities:[join(__dirname, '**', '*.entity.{ts,js}')],
        migrations :["dist/migration/**/*.ts"],
    }),
);