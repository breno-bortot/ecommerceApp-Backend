import { Delete, Injectable, UseInterceptors } from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserInterface> {
        const { email } = createUserDto;
        const user =  await this.userModel.findOne({email});

        if(user){
            throw `User: ${user.name} with email: ${user.email}, already exists`;
        }

        const newUser = new this.userModel(createUserDto);
        await newUser.save();

        return newUser; 
    }
    
    findUserByLogin() {}
    
    findUserById() {}
    

    updateUser() {}

    deleteUser() {}
}
