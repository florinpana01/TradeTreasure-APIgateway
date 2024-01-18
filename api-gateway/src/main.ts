import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  app.setGlobalPrefix('api');

  const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');
  //console.log('Service Account Path:', serviceAccountPath);

  const serviceAccount = require(serviceAccountPath);
  //console.log('Service Account:', serviceAccount);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Your Firebase Admin SDK configuration
  });

  await app.listen(8001);
}

bootstrap();
