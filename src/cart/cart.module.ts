import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartSchema } from './schema/cart.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
        AuthModule
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}
