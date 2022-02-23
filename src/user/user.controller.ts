import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dtos';
import { UserParams } from './dto/user.params';
import { UserInterface } from './interface/user.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './utilities/user.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get('account')
    findAction(@User() userId: string): Promise<UserInterface> { 
        return this.userService.findUserById(userId);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Put('account')
    updateAction(@User() userId: string, @Body() updateUserDto: UpdateUserDto): Promise<UserInterface> {
        return this.userService.updateUser(userId, updateUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('account')
    deleteAction(@User() userId: string): Promise<UserInterface> {
        return this.userService.deleteUser(userId);
    }

}
 