import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/user/guards/customer.guard';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dtos';
import { CartInterface } from './interface/cart.interface';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/utilities/user.decorator';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Post('create')
    createAction(@Body() createCartDto: CreateCartDto, @User() customer_id: string): Promise<CartInterface> {
        return this.cartService.createCart(createCartDto, customer_id);
    }   
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Get(':cart_id')
    findByIdAction(@Param('cart_id') cart_id: string): Promise<CartInterface>  {
        return this.cartService.findCartbyId(cart_id);
    }
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Put('update/:cart_id')
    updateAction(
        @Body() updateCartDto: UpdateCartDto, 
        @Param('cart_id') cart_id: string,
        @User() customer_id: string
    ): Promise<CartInterface> {  
        return this.cartService.updateCart(updateCartDto, cart_id, customer_id)
    }
}

