import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dtos';
import { OrderInterface } from './interface/order.interface';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    //User authentication/ Customer authorization
    @Post('create/:customer_id')
    checkoutAction(@Body() createOrderDto: CreateOrderDto, @Param('customer_id') custumor_id: string): Promise<OrderInterface> {
        return this.orderService.createOrder(createOrderDto, custumor_id);
    }
    //User authentication/ Customer authorization
    @Get('customer_list/:customer_id')
    listByCustomerAction(@Param('customer_id') customer_id: string): Promise<OrderInterface[]> {
        return this.orderService.findByCustomer(customer_id);
    }
    //User authentication/ Seller authorization
    @Get('seller_list/:seller_id')
    listBySellerAction(@Param('seller_id') seller_id: string): Promise<OrderInterface[]> {
        return this.orderService.findBySeller(seller_id);
    }
    //User authentication/ Customer
     authorization
    @Get('details/:order_id/:customer_id')
    findOneAction(@Param() params): Promise<OrderInterface> {
        return this.orderService.findOne(params);
    }

}
