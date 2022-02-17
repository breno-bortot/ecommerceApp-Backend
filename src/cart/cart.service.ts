import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dtos';
import { CartInterface } from './interface/cart.interface';

@Injectable()
export class CartService {
    constructor(@InjectModel('Cart') private readonly cartModel: Model<CartInterface>) {}

    async createCart(createCartDto: CreateCartDto, customer_id: string) {
        try {
            const createCartBody = {
                customer_id,
                cart_products: createCartDto.cart_products
            };
            const cart = await new this.cartModel(createCartBody)
                .populate('cart_products.cart_product_id');
            
            const cartTotal = await cart.cart_products.reduce((acc, cartProduct) => {
                const price = cartProduct.cart_product_id.price * cartProduct.quantity;
                return acc + price;
            }, 0);
           cart.cart_total = Number(cartTotal.toFixed(2));
            
            const newCart = await cart.save();

            return newCart;
            
        } catch (error) {
            
            return error.message;

        }
    }

    async findCartbyId(cart_id: string) {
        try {
            const cart = await this.cartModel.findById(cart_id)
                .populate('cart_products.cart_product_id');

            return cart;              
        } catch (error) {
            
            return error.message;

        }
    }

    async updateCart(updateCartDto, params) {
        try {
            const cart = await this.cartModel.findOne({ _id: params.cart_id, customer_id: params.customer_id })

            if (!cart) {
                throw { message: `Unauthorized Customer for this Cart` }
            }
            
            cart.cart_products = updateCartDto.cart_products;

            await cart.populate('cart_products.cart_product_id');
       
            const cartTotal = await cart.cart_products.reduce((acc, cartProduct) => {
                const price = cartProduct.cart_product_id.price * cartProduct.quantity;
                return acc + price;
            }, 0);
            cart.cart_total = Number(cartTotal.toFixed(2));            
            
            const updatedCart = await cart.save();
           
            return updatedCart;
            
        } catch (error) {
            
            return error.message;

        }
    }
}
