import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/*
const express = require("express");
const cors = require("cors");


const app = express();

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         optionsSuccessStatus: 200,
//         // Some legacy browsers choke on 204
//     })
// );
app.use(
    cors({origin: 'http://localhost:3000', credentials: true})
);
*/



async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  const options = new DocumentBuilder()
    .setTitle('ToDo List')
    .setDescription('Документация REST API')
    .setVersion('0.0.1')
    .addTag('ToDo')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);


  const PORT = 3001;
  await app.listen(PORT, () => {
      console.log(`Example app listening at Port: ${PORT}`)
  });
}
bootstrap();
