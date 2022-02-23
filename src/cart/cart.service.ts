import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/cart.dtos';
import { CartInterface } from './interface/cart.interface';

@Injectable()
export class CartService {
    constructor(@InjectModel('Cart') private readonly cartModel: Model<CartInterface>) {}

    async createCart(createCartDto: CreateCartDto, customer_id: string): Promise<CartInterface> {
            const createCartBody = {
                customer_id,
                cart_products: createCartDto.cart_products
            };
            const cart = await new this.cartModel(createCartBody)
                .populate('cart_products.cart_product_id');
    
            const cartTotal = await cart.cart_products.reduce((acc, cartProduct) => {
                if (!cartProduct.cart_product_id) {
                    throw new HttpException(`Invalid cart_product_Id`, HttpStatus.BAD_REQUEST);
                }

                const price = cartProduct.cart_product_id.price * cartProduct.quantity;
                
                return acc + price;
            }, 0);

            cart.cart_total = Number(cartTotal.toFixed(2));
            
            const cartSellers = cart.cart_products.map(product => {
                    return { seller_id: product.cart_product_id.seller_id };
            })
            cart.cart_sellers = cartSellers;
            
            const newCart = await cart.save();

            if (!newCart) {
                throw new HttpException(`Cart was not saved in DB`, HttpStatus.INTERNAL_SERVER_ERROR)
            }

            return newCart;
    }

    async findCartbyId(cart_id: string): Promise<CartInterface> {
        try {
            const cart = await this.cartModel.findById(cart_id)
                .populate('cart_products.cart_product_id');
            
            if (!cart) {
                throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND)
            }

            return cart;      

        } catch (error) {
            throw new HttpException(`Invalid cart-id`, HttpStatus.BAD_REQUEST)
        }
    }

    async updateCart(updateCartDto, params): Promise<CartInterface> { 
        const cart = await this.cartModel.findOne({ _id: params.cart_id, customer_id: params.customer_id })
            
            if (!cart) {
                throw new HttpException(`Unauthorized customer`, HttpStatus.UNAUTHORIZED);
            }
            
            cart.cart_products = updateCartDto.cart_products;

            await cart.populate('cart_products.cart_product_id');
       
            const cartTotal = await cart.cart_products.reduce((acc, cartProduct) => {
                if (!cartProduct.cart_product_id) {
                    throw new HttpException(`Invalid Cart_product_Id`, HttpStatus.BAD_REQUEST);
                }

                const price = cartProduct.cart_product_id.price * cartProduct.quantity;
                return acc + price;
            }, 0);
            cart.cart_total = Number(cartTotal.toFixed(2));    
            
            const updatedCart = await cart.save();

            if (!updatedCart) {
                throw new HttpException(`Cart was not updated in DB`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
           
            return updatedCart;
    }
}
