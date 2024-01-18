import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { LikeModule } from './like/like.module';
import { FollowModule } from './follow/follow.module';
import { FirebaseAuthMiddleware } from './FirebaseAuthMiddleware/firebase-auth.middleware';

@Module({
  //testing
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Totamealand1983',
      database: 'api_temp',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    LikeModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes('*'); // Apply to all routes
  }
}
