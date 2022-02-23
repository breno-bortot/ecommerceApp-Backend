import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartInterface } from 'src/cart/interface/cart.interface';
import { ProductInterface } from 'src/product/interface/product.interface';
import { CreateOrderDto } from './dto/order.dtos';
import { OrderInterface } from './interface/order.interface';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<OrderInterface>,
        @InjectModel('Cart') private readonly cartModel: Model<CartInterface>, 
        @InjectModel('Product') private readonly productModel: Model<ProductInterface> 
        ) {}
    
    async createOrder(createOrderDto: CreateOrderDto, customer_id: string): Promise<OrderInterface> {
            const { cart_id, payment_method, deliver_to } = createOrderDto;
            
            const outdatedCart = await this.cartModel.findOne({ _id: cart_id, customer_id: customer_id })

            if (!outdatedCart) {
                throw new HttpException(`Unauthorized customer`, HttpStatus.UNAUTHORIZED);
            }

            if (outdatedCart.checkout_done) {
                throw new HttpException(`Cart's checkout has already been done.`, HttpStatus.BAD_REQUEST);
            }
           
            await Promise.all(outdatedCart.cart_products.map(async cartProduct => {
                const outdatedProduct = await this.productModel.findById(cartProduct.cart_product_id);
                
                if (!outdatedProduct) {
                    throw new HttpException(`Invalid cart_product_Id`, HttpStatus.BAD_REQUEST);
                }

                const { stock } = outdatedProduct;

                if (stock < cartProduct.quantity) {
                    throw new HttpException(`Product with reference_code: ${outdatedProduct.reference_code} has insufficient stock for the Cart quantity requested `, HttpStatus.BAD_REQUEST);
                }

                const updatedStock = Number(stock - cartProduct.quantity);

                await this.productModel.findByIdAndUpdate(
                    cartProduct.cart_product_id, 
                    { stock: updatedStock }
                )
            }))

            const cart =  await this.cartModel.findByIdAndUpdate(cart_id, { checkout_done: true }, { new: true })

            const createOrderBody = {
                order_customer_id: customer_id,
                order_sellers: cart.cart_sellers,
                cart_id: cart,
                payment_method,
                deliver_to
            }
            
            const newOrder = await new this.orderModel(createOrderBody);

            const orderTotal = newOrder.cart_id.cart_total + newOrder.delivery_fee;
            newOrder.order_total = Number(orderTotal.toFixed(2));

            await newOrder.save();

            if (!newOrder) {
                throw new HttpException(`Order was not saved in DB`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            
            return newOrder;
    }

    async findByCustomer(customer_id: string): Promise<OrderInterface[]> {
        try {
            const customerList = await this.orderModel.find({ order_customer_id: customer_id });

            return customerList;

        } catch (error) {
            throw new HttpException(`Invalid order_customer_id`, HttpStatus.BAD_REQUEST);
        }
    }
    
    async findBySeller(seller_id: string) {
        try {
            const sellerList = await this.orderModel.find({ 'order_sellers.seller_id': seller_id });
            
            return sellerList;

        } catch (error) {
            throw new HttpException(`Invalid Seller`, HttpStatus.BAD_REQUEST);
        }
    }

    async findOne(params): Promise<OrderInterface> {
        try {
            const { order_id, customer_id } = params;
            const orderDetails = await this.orderModel.findOne({ 
                _id: order_id, 
                order_customer_id: customer_id
            });
            
            if (!orderDetails) {
                throw new HttpException(`Unauthorized customer`, HttpStatus.UNAUTHORIZED);
            }

            await orderDetails.populate('order_customer_id');
            await orderDetails.populate('cart_id');
            await orderDetails.populate('cart_id.cart_products.cart_product_id');
            await orderDetails.populate('cart_id.cart_products.cart_product_id');
            await orderDetails.populate('cart_id.cart_products.cart_product_id.seller_id');
            
            return orderDetails;
        } catch (error) {
            throw new HttpException(`Invalid order || user`, HttpStatus.BAD_REQUEST);
        }      
    }
}
