import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dtos';
import { CartInterface } from './interface/cart.interface';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('create/:customerId')
    createAction(@Body() createCartDto: CreateCartDto, @Param('customerId') customerId: string): Promise<CartInterface> {
        return this.cartService.createCart(createCartDto, customerId);
    }   
    
    @Get(':cartId')
    findByIdAction(@Param('cartId') cartId: string): Promise<CartInterface>  {
        return this.cartService.findCartbyId(cartId);
    }
    
    @Put('update/:cartId/:customerId')
    updateAction(@Body() updateCartDto: CreateCartDto, @Param() params): Promise<CartInterface> {  
        return this.cartService.updateCart(updateCartDto, params)
    }
}

