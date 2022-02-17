import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dtos';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('create/:customer_id')
    checkoutAction(@Body() createOrderDto: CreateOrderDto, @Param('customer_id') custumor_id: string) {
        return this.orderService.createOrder(createOrderDto, custumor_id);
    }
}
