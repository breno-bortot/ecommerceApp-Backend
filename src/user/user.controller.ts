import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dtos';
import { UserParams } from './dto/user.params';
import { UserInterface } from './interface/user.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './utilities/user.decorator';
import { SellerGuard } from './guards/seller.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    @Get('listAll')
    findAllAction(@User() userId: string ) {
        
        return this.userService.findAll();
    }
    
    
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
 