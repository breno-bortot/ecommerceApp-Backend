import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/user/guards/customer.guard';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dtos';
import { CartInterface } from './interface/cart.interface';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/utilities/user.decorator';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { ApiBadRequestResponse, ApiCookieAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CleanCartSwagger, CreateCartSwagger } from './swagger/cart.swagger';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
        @Inject(AuthService) private readonly authService: AuthService
    ) {}
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiCookieAuth()
    @Post('addToCart')
    @ApiOperation({ summary: 'Add to Cart/ Create Cart'})
    @ApiCreatedResponse({ 
        description: 'Cart created',
        type: CreateCartSwagger  
    })
    @ApiBadRequestResponse({ description: 'Invalid parameters' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    async addToCartAction(@Body() createCartDto: CreateCartDto, @User() user, @Res({ passthrough: true }) response: Response): Promise<CartInterface> {
        if (user.cart_id) {
            return this.cartService.updateCart(createCartDto, user.cart_id, user.sub);
        }

        const newCart = await this.cartService.createCart(createCartDto, user.sub);
        const newToken = await this.authService.addCartIdToUser(user, newCart['_id']);
        
        response.cookie('USER_TOKEN', newToken, { 
            httpOnly: true,
            maxAge: 900000 
        });
        
        return newCart;
    }   
    

    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiCookieAuth()
    @Get()
    @ApiOperation({ summary: 'Shopping Cart'})
    @ApiOkResponse({ 
        description: 'Cart found',
        type: CreateCartSwagger
    })
    @ApiNotFoundResponse({ description: 'Invalid product-id'})
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    findByIdAction(@User() user): Promise<CartInterface>  {
        return this.cartService.findCartbyId(user.cart_id);
    }
    

    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiCookieAuth()
    @Put()
    @ApiOperation({ summary: 'Update Cart'})
    @ApiCreatedResponse({ 
        description: 'Cart updated',
        type: CreateCartSwagger  
    })
    @ApiBadRequestResponse({ description: 'Invalid parameters' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    updateAction(
        @Body() updateCartDto: UpdateCartDto, 
        @User() user
    ): Promise<CartInterface> {  
        return this.cartService.updateCart(updateCartDto, user.cart_id, user.sub);
    }
    

    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiCookieAuth()
    @Delete('clean')
    @ApiOperation({ summary: 'Remove all products from the Cart'})
    @ApiOkResponse({ 
        description: 'Cart cleaned successfully',
        type: CleanCartSwagger
     })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    cleanAction( 
        @User() user
    ): Promise<CartInterface> { 
        const clearCart = { cart_products: [] }; 
        return this.cartService.updateCart(clearCart, user.cart_id, user.sub);
    }
}

