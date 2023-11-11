import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://pjfufoya:LuO22_OIV_SIcvDewsRCbu_nTAUooYvt@kangaroo.rmq.cloudamqp.com/pjfufoya'],
          queue: "users-queue-gateway",
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [UserController]
})
export class UserModule {}
