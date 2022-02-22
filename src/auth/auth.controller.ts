import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginDto } from 'src/user/dto/user.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    loginAction(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.validateUser(loginDto);
    }

    @Post('register')
    registerAction(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.authService.registerUser(createUserDto);
    }
    

}

