import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import {Product} from './product.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductModule,
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://pjfufoya:LuO22_OIV_SIcvDewsRCbu_nTAUooYvt@kangaroo.rmq.cloudamqp.com/pjfufoya'],
          queue: "products_queue",
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ProductController]
})
export class ProductModule {}
