import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CustomerGuard } from 'src/user/guards/customer.guard';
import { SellerGuard } from 'src/user/guards/seller.guard';
import { User } from 'src/user/utilities/user.decorator';
import { CreateOrderDto } from './dto/order.dtos';
import { OrderInterface } from './interface/order.interface';
import { OrderService } from './order.service';
import { OrderDetailsSwagger, OrderListSwagger } from './swagger/order.swagger';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiCookieAuth()
    @Post()
    @ApiOperation({ summary: 'Checkout(Create Order)'})
    @ApiCreatedResponse({ 
        description: 'Checkout Done, Order created',
        type: OrderDetailsSwagger  
    })
    @ApiBadRequestResponse({ description: 'Invalid parameters' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    checkoutAction(@Body() createOrderDto: CreateOrderDto, @User() user): Promise<OrderInterface> {
        return this.orderService.createOrder(createOrderDto, user);
    }
    

    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiCookieAuth()
    @Get('customer_list')
    @ApiOperation({ summary: 'List of Orders By Customer'})
    @ApiOkResponse({ 
        description: `Customer's Order list`,
        type: [OrderListSwagger]   
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    listByCustomerAction(@User() user): Promise<OrderInterface[]> {
        return this.orderService.findByCustomer(user.sub);
    }
    

    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @ApiCookieAuth()
    @Get('seller_list')
    @ApiOperation({ summary: 'List of Orders By Seller'})
    @ApiOkResponse({ 
        description: `Seller's Order list`,
        type: [OrderListSwagger]   
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    listBySellerAction(@User() user): Promise<OrderInterface[]> {
        return this.orderService.findBySeller(user.sub);
    }
    

    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiCookieAuth()
    @Get('details/:order_id')
    @ApiOperation({ summary: 'Order details'})
    @ApiOkResponse({ 
        description: `Details of the Order`,
        type: OrderDetailsSwagger     
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBadRequestResponse({ description: 'Invalid order-id'})
    findOneAction(@Param('order_id') order_id: string, @User() user): Promise<OrderInterface> {
        return this.orderService.findOne(order_id, user.sub);
    }

}
