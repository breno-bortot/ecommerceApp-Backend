import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dtos';
import { OrderInterface } from './interface/order.interface';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('create/:customer_id')
    checkoutAction(@Body() createOrderDto: CreateOrderDto, @Param('customer_id') custumor_id: string): Promise<OrderInterface> {
        return this.orderService.createOrder(createOrderDto, custumor_id);
    }

    @Get('customer_list/:customer_id')
    listByCustomerAction(@Param('customer_id') customer_id: string): Promise<OrderInterface[]> {
        return this.orderService.findByCustomer(customer_id);
    }
    
    @Get('details/:order_id/:customer_id')
    findOneAction(@Param() params): Promise<OrderInterface[]> {
        return this.orderService.findOne(params);
    }
}
