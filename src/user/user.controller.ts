import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto/user.dtos';
import { UserParams } from './dto/user.params';
import { UserInterface } from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Get('auth')
    @UseGuards(AuthGuard('jwt'))
    tempAuth() {
        return { auth: 'works'}
    }
    
    @Post('register')
    async registerAction(@Body() createUserDto: CreateUserDto): Promise<object> {
        const user = await this.userService.createUser(createUserDto);
        const payload = {
            email: user.email,
            seller: user.seller
        }

        const token = await this.authService.signPayload(payload);

        return { user, token };
    }
    
    @Post('login')
    async loginAction(@Body() loginDto: LoginDto): Promise<object> {
        const user = await this.userService.findUserByLogin(loginDto);
        const payload = {
            email: user.email,
            seller: user.seller
        }

        const token = await this.authService.signPayload(payload);

        return { user, token };
    }
    //User authentication
    @Get(':userId')
    findAction(@Param() params: UserParams): Promise<UserInterface> { 
        return this.userService.findUserById(params.userId);
    }
    //User authentication
    @Put(':userId')
    updateAction(@Body() updateUserDto: UpdateUserDto, @Param() params: UserParams): Promise<UserInterface> {
        return this.userService.updateUser(params.userId, updateUserDto);
    }
    //User authentication
    @Delete(':userId')
    deleteAction(@Param() params: UserParams): Promise<UserInterface> {
        return this.userService.deleteUser(params.userId);
    }

}
 