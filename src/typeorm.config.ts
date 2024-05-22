import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.BD_PORT,
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
export default AppDataSource;
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
