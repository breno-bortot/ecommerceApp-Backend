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
    checkoutAction(@Body() createOrderDto: CreateOrderDto, @User() user): Promise<OrderInterface> {
        return this.orderService.createOrder(createOrderDto, user.sub);
    }
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Get('customer_list')
    listByCustomerAction(@User() user): Promise<OrderInterface[]> {
        return this.orderService.findByCustomer(user.sub);
    }
    
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @Get('seller_list')
    listBySellerAction(@User() user): Promise<OrderInterface[]> {
        return this.orderService.findBySeller(user.sub);
    }
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Get('details/:order_id')
    findOneAction(@Param('order_id') order_id: string, @User() user): Promise<OrderInterface> {
        return this.orderService.findOne(order_id, user.sub);
    }

}
