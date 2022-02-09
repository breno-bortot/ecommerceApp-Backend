import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return createUserDto;
    }

    @Get(':userId')
    readUser(@Param('userId') userId) {
        return `User ${userId}`;
    }

    @Put(':userId')
    updateUser(@Body() updateUserDto: UpdateUserDto, @Param('userId') userId) {
        return updateUserDto;
    }
    
    @Delete(':userId')
    deleteUser(@Param('userId') userId) {
        return `deleted user ${userId}`;
    }

}
 