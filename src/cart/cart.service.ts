import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dtos';
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
                .populate('cartProducts.cartProductId');
            
            const cartTotal = await cart.cartProducts.reduce((acc, cartProduct) => {
                const price = cartProduct.cartProductId.price * cartProduct.quantity;
                return acc + price;
            }, 0);
           cart.cartTotal = Number(cartTotal.toFixed(2));
            
            const newCart = await cart.save();

            return newCart;
            
        } catch (error) {
            
            return error.message;

        }
    }

    async findCartbyId(cartId: string) {
        try {
            const cart = await this.cartModel.findById(cartId)
                .populate('cartProducts.cartProductId');

            return cart;              
        } catch (error) {
            
            return error.message;

        }
    }

    async updateCart(updateCartDto, params) {
        try {
            const cart = await this.cartModel.findOne({ _id: params.cartId, customer_id: params.customerId })

            if (!cart) {
                throw { message: `Invalid Customer for this Cart` }
            }
            
            cart.cartProducts = updateCartDto.cartProducts;

            await cart.populate('cartProducts.cartProductId');
       
            const cartTotal = await cart.cartProducts.reduce((acc, cartProduct) => {
                const price = cartProduct.cartProductId.price * cartProduct.quantity;
                return acc + price;
            }, 0);
            cart.cartTotal = Number(cartTotal.toFixed(2));            
            
            const updatedCart = await cart.save();
           
            return updatedCart;
            
        } catch (error) {
            
            return error.message;

        }
    }
}
