import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetailsModule } from '../order-details/order-details.module';
import { ProductModule } from '../product/product.module';
import { AlertModule } from '../alter/alert.module';

@Module({
  imports: [
    AlertModule,
    ProductModule,
    OrderDetailsModule,
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
