import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
require("dotenv").config()

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.INFLUENCER_ID_RMQ],
      queue: process.env.INFLUENCER_ID_QUEUE_NAME,
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen();
}

bootstrap();