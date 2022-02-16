import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/cart.dtos';
import { CartInterface } from './interface/cart.interface';

@Injectable()
export class CartService {
    constructor(@InjectModel('Cart') private readonly cartModel: Model<CartInterface>) {}

    async createCart(createCartDto: CreateCartDto, customerId: string) {
        try {
            const createCartBody = {
                customer_id: customerId,
                cartProducts: createCartDto.cartProducts
            };
           
            const cart = await new this.cartModel(createCartBody)
                .populate('customer_id');

            await cart.populate('cartProducts.cartProductId');
            
            const cartTotal = await cart.cartProducts.reduce((acc, cartProduct) => {
                const price = cartProduct.cartProductId.price * cartProduct.quantity;
                return acc + price;
            }, 0);
           
            cart.cartTotal = cartTotal;
            
            await cart.save();

            return cart;
            
        } catch (error) {
            
            return error.message;

        }
    }
}
