import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), UserModule, ProductModule, CartModule, OrderModule],
  controllers: [AppController, UserController, ProductController, CartController, OrderController],
  providers: [AppService, UserService, ProductService, CartService, OrderService],
})
export class AppModule {}
