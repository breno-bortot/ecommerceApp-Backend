import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dtos';
import { UserInterface } from './interface/user.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './utilities/user.decorator';
import { ApiBody, ApiCookieAuth, ApiFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserSwagger } from './swagger/user.swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @ApiCookieAuth()
    @Get('account')
    @ApiOperation({ summary: 'User account'})
    @ApiFoundResponse({ 
        description: 'User found',
        type: UserSwagger
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    findAction(@User() user): Promise<UserInterface> { 
        return this.userService.findUserById(user.sub);
    }
    
    
    @UseGuards(AuthGuard('jwt'))
    @ApiCookieAuth()
    @Put('account')
    @ApiOperation({ summary: 'Update user account'})
    @ApiOkResponse({ 
        description: 'User account updated successfully', 
        type: UserSwagger
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    updateAction(@User() user, @Body() updateUserDto: UpdateUserDto): Promise<UserInterface> {
        return this.userService.updateUser(user.sub, updateUserDto);
    }


    @UseGuards(AuthGuard('jwt'))
    @ApiCookieAuth()
    @Delete('account')
    @ApiOperation({ summary: 'Delete user account' })
    @ApiOkResponse({ description: 'User account deleted successfully' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    deleteAction(@User() user): Promise<UserInterface> {
        return this.userService.deleteUser(user.sub);
    }

}
 