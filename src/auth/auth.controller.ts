import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto, LoginDto } from 'src/user/dto/user.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    async loginAction(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const token = await this.authService.validateUser(loginDto);
        
        response.cookie('USER_TOKEN', token, { 
            httpOnly: true,
            maxAge: 900000 
        });
        
        return;
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('logout')
    async logoutAction(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('USER_TOKEN');

        return;
    }

    @Post('register')
    async registerAction(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const token = await this.authService.registerUser(createUserDto);
        
        response.cookie('USER_TOKEN', token, { 
            httpOnly: true,
            maxAge: 900000 
        });
        
        return;
    }
    

}

