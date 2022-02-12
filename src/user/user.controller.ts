import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdParam } from './dto/user-id.param';
import { UserInterface } from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    registerAction(@Body() createUserDto: CreateUserDto): Promise<UserInterface> {
       console.log(createUserDto)
        return /* this.userService.createUser(createUserDto); */
    }
    
    @Post('login')
    loginAction(@Body() loginDto: LoginDto) {
        return loginDto;
    }

    @Get(':userId')
    findAction(@Param() params: UserIdParam) { 
        return `User ${params.userId} `;
    }
     
    @Put(':userId')
    updateAction(@Body() updateUserDto: UpdateUserDto, @Param('userId') userId) {
        return updateUserDto;
    }
    
    @Delete(':userId')
    deleteAction(@Param('userId') userId) {
        return `deleted user ${userId}`;
    }

}
 