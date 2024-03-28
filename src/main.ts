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
  await app.listen(3000);
  console.log('App listening');
  console.log('Zona horaria actual:', process.env.TZ); // Esto imprimirá la zona horaria actual configurada en tu aplicación Node.js

  console.log(
    'Zona horaria actual:',
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ); // Otra forma de imprimir la zona horaria actual
}
bootstrap();
