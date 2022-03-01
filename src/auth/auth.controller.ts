import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBody, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto, LoginDto } from 'src/user/dto/user.dtos';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'User Registration'})
    @ApiCreatedResponse({ description: 'User created' })
    @ApiBadRequestResponse({ description: 'Invalid parameters' })
    @ApiBody({ type: CreateUserDto })
    async registerAction(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const token = await this.authService.registerUser(createUserDto);
        
        response.cookie('USER_TOKEN', token, { 
            httpOnly: true,
            maxAge: 900000 
        });
        
        return { message: 'User created successfully' };
    }
    
    @Post('login')
    @ApiOperation({ summary: 'User Login'})
    @ApiOkResponse({ description: 'Login successfull' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBody({ type: LoginDto })
    async loginAction(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const token = await this.authService.validateUser(loginDto);
        
        response.cookie('USER_TOKEN', token, { 
            httpOnly: true,
            maxAge: 900000 
        });
        
        return;
    }
    
    @UseGuards(AuthGuard('jwt'))
    @ApiCookieAuth()
    @Get('logout')
    @ApiOperation({ summary: 'User logout'})
    @ApiOkResponse({ description: 'Logout succesfull' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    async logoutAction(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('USER_TOKEN');

        return;
    }
    

}

