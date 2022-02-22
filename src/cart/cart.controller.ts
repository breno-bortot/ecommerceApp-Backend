import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/user/guards/customer.guard';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dtos';
import { CartInterface } from './interface/cart.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Post('create/:customer_id')
    createAction(@Body() createCartDto: CreateCartDto, @Param('customer_id') customer_id: string): Promise<CartInterface> {
        return this.cartService.createCart(createCartDto, customer_id);
    }   
    //User authentication/ Customer authorization
    @Get(':cart_id')
    findByIdAction(@Param('cart_id') cart_id: string): Promise<CartInterface>  {
        return this.cartService.findCartbyId(cart_id);
    }
    //User authentication/ Customer authorization
    @Put('update/:cart_id/:customer_id')
    updateAction(@Body() updateCartDto: CreateCartDto, @Param() params): Promise<CartInterface> {  
        return this.cartService.updateCart(updateCartDto, params)
    }
}

