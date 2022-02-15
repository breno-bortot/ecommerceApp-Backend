import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto/user.dtos';
import { UserParams } from './dto/user.params';
import { UserInterface } from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    registerAction(@Body() createUserDto: CreateUserDto): Promise<UserInterface> {
        return this.userService.createUser(createUserDto);
    }
    
    @Post('login')
    loginAction(@Body() loginDto: LoginDto) {
        return loginDto;
    }

    @Get(':userId')
    findAction(@Param() params: UserParams): Promise<UserInterface> { 
        return this.userService.findUserById(params.userId);
    }
     
    @Put(':userId')
    updateAction(@Body() updateUserDto: UpdateUserDto, @Param() params: UserParams): Promise<UserInterface> {
        return this.userService.updateUser(params.userId, updateUserDto);
    }
    
    @Delete(':userId')
    deleteAction(@Param() params: UserParams): Promise<UserInterface> {
        return this.userService.deleteUser(params.userId);
    }

}
 