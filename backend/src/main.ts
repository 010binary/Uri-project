import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.use(logger);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
