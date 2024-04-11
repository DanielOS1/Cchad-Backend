import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();
  const utcDate = new Date();
  console.log('Hora actual en UTC:', utcDate.toISOString());
  const date = new Date();
  console.log('Hora actual:', date.toLocaleTimeString());
  console.log('Timezone:', date.toString().match(/\((.*)\)/)[1]);

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
