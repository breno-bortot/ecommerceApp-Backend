import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dtos';
import { UserInterface } from './interface/user.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './utilities/user.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get('account')
    findAction(@User() user): Promise<UserInterface> { 
        return this.userService.findUserById(user.sub);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Put('account')
    updateAction(@User() user, @Body() updateUserDto: UpdateUserDto): Promise<UserInterface> {
        return this.userService.updateUser(user.sub, updateUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('account')
    deleteAction(@User() user): Promise<UserInterface> {
        return this.userService.deleteUser(user.sub);
    }

}
 