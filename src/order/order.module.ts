import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from 'src/cart/schema/cart.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './schema/order.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, { name: 'Cart', schema: CartSchema }])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
