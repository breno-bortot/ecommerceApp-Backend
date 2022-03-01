import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from 'src/cart/schema/cart.schema';
import { ProductSchema } from 'src/product/schema/product.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './schema/order.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, { name: 'Cart', schema: CartSchema }, { name: 'Product', schema: ProductSchema }])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
