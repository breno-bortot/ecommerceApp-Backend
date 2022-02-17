import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartInterface } from 'src/cart/interface/cart.interface';
import { CreateOrderDto } from './dto/order.dtos';
import { OrderInterface } from './interface/order.interface';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<OrderInterface>, @InjectModel('Cart') private readonly cartModel: Model<CartInterface> 
        ) {}
    
    async createOrder(createOrderDto: CreateOrderDto, customer_id: string) {
        try {
            const { cart_id, payment_method, deliver_to } = createOrderDto;
            const cart = await this.cartModel.findOneAndUpdate({ _id: cart_id, customer_id: customer_id }, { checkout_done: true }, { new: true })

            if (!cart) {
                throw { message: `Unauthorized Customer for this Cart` }
            }

            const createOrderBody = {
                order_customer_id: customer_id,
                cart_id: cart,
                payment_method,
                deliver_to
            }
            
            const newOrder = await new this.orderModel(createOrderBody);

            const orderTotal = newOrder.cart_id.cart_total + newOrder.delivery_fee;
            newOrder.order_total = Number(orderTotal.toFixed(2));

            await newOrder.save();
            
            return newOrder;

        } catch (error) {
            
            return error.message;
    
        }
    }

    async findByCustomer(customer_id: string): Promise<OrderInterface[]> {
        try {
            const list = await this.orderModel.find({ order_customer_id: customer_id });

            return list;

        } catch (error) {
            
            return error.message;

        }
    }

    async findOne(params) {
        try {
            const { order_id, customer_id } = params;
            const orderDetails = await this.orderModel.findOne({ 
                _id: order_id, 
                order_customer_id: customer_id
            })
            
            if (!orderDetails) {
                throw { message: `Unauthorized Customer for this Order` }
            }

            await orderDetails.populate('order_customer_id');
            await orderDetails.populate('cart_id');
            await orderDetails.populate('cart_id.cart_products.cart_product_id');
            await orderDetails.populate('cart_id.cart_products.cart_product_id');
            await orderDetails.populate('cart_id.cart_products.cart_product_id.seller_id');
            
            return orderDetails;

        } catch (error) {
            
            return error.message;

        }
    }
    
}
