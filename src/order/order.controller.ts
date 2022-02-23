import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomerGuard } from 'src/user/guards/customer.guard';
import { SellerGuard } from 'src/user/guards/seller.guard';
import { User } from 'src/user/utilities/user.decorator';
import { CreateOrderDto } from './dto/order.dtos';
import { OrderInterface } from './interface/order.interface';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Post('create')
    checkoutAction(@Body() createOrderDto: CreateOrderDto, @User() custumor_id: string): Promise<OrderInterface> {
        return this.orderService.createOrder(createOrderDto, custumor_id);
    }
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Get('customer_list')
    listByCustomerAction(@User() customer_id: string): Promise<OrderInterface[]> {
        return this.orderService.findByCustomer(customer_id);
    }
    
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @Get('seller_list')
    listBySellerAction(@User() seller_id: string): Promise<OrderInterface[]> {
        console.log(seller_id)
        return this.orderService.findBySeller(seller_id);
    }
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Get('details/:order_id')
    findOneAction(@Param('order_id') order_id: string, @User() customer_id: string): Promise<OrderInterface> {
        return this.orderService.findOne(order_id, customer_id);
    }

}
