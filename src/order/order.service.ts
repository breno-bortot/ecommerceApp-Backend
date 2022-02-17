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
            const cart = await this.cartModel.findOne({ _id: cart_id, customer_id: customer_id })

            if (!cart) {
                throw { message: `Unauthorized Customer for this Cart` }
            }

            const createOrderBody = {
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
    
}
