import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from './like.controller';
import { Like } from './like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    ClientsModule.register([
      {
        name: 'LIKE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://pjfufoya:LuO22_OIV_SIcvDewsRCbu_nTAUooYvt@kangaroo.rmq.cloudamqp.com/pjfufoya'],
          queue: "products-queue-gateway",
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [LikeController]
})
export class LikeModule { }
