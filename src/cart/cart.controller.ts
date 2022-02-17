import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dtos';
import { CartInterface } from './interface/cart.interface';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('create/:customer_id')
    createAction(@Body() createCartDto: CreateCartDto, @Param('customer_id') customer_id: string): Promise<CartInterface> {
        return this.cartService.createCart(createCartDto, customer_id);
    }   
    
    @Get(':cart_id')
    findByIdAction(@Param('cart_id') cart_id: string): Promise<CartInterface>  {
        return this.cartService.findCartbyId(cart_id);
    }
    
    @Put('update/:cart_id/:customer_id')
    updateAction(@Body() updateCartDto: CreateCartDto, @Param() params): Promise<CartInterface> {  
        return this.cartService.updateCart(updateCartDto, params)
    }
}

