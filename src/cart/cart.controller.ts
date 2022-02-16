import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cart.dtos';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('create/:customerId')
    createAction(@Body() createCartDto: CreateCartDto, @Param('customerId') customerId: string) {
        return { createCartDto, customerId }
    }   
    
    @Get(':cartId')
    findByIdAction() {

    }
    
    @Put('update/:cartId')
    updateAction() {

    }
}

