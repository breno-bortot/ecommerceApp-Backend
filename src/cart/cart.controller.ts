import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/user/guards/customer.guard';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dtos';
import { CartInterface } from './interface/cart.interface';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/utilities/user.decorator';
import { AuthService } from 'src/auth/auth.service';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
        @Inject(AuthService) private readonly authService: AuthService
    ) {}
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Post('addToCart')
    async addToCartAction(@Body() createCartDto: CreateCartDto, @User() user) {
        if (user.cart_id) {
            return this.cartService.updateCart(createCartDto, user.cart_id, user.sub);
        }

        const newCart = await this.cartService.createCart(createCartDto, user.sub);
       
        return this.authService.addCartIdToUser(user, newCart['_id']);
    }   
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Get('')
    findByIdAction(@User() user): Promise<CartInterface>  {
        return this.cartService.findCartbyId(user.cart_id);
    }
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Put('update')
    updateAction(
        @Body() updateCartDto: UpdateCartDto, 
        @User() user
    ): Promise<CartInterface> {  
        return this.cartService.updateCart(updateCartDto, user.cart_id, user.sub);
    }
    
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @Get('clean')
    cleanAction( 
        @User() user
    ): Promise<CartInterface> { 
        const clearCart = { cart_products: [] }; 
        return this.cartService.updateCart(clearCart, user.cart_id, user.sub);
    }
}

