import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user/user.entity';
import { LikeController } from './like/like.controller';
import { LikeModule } from './like/like.module';

@Module({
  //testing
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: '127.0.0.1',
      host: 'localhost',
      port: 3306,
      // username: 'florinpana98',
      username: 'root',
      // password: 'totamealand',
      password: 'Totamealand1983',
      database: 'api_temp',
      autoLoadEntities: true,
      synchronize: true,
    }),
    //TypeOrmModule.forFeature([User]),
    UserModule,
    ProductModule,
    LikeModule,
  ],
  controllers: [AppController, LikeController],
  providers: [AppService],
})
export class AppModule {}
