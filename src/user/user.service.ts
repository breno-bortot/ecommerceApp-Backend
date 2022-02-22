import { Injectable } from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto/user.dtos';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>) {}

    async findAll() {
        return await this.userModel.find();
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserInterface> {
        try {
            const { email } = createUserDto;
            const user =  await this.userModel.findOne({email});
    
            if (user) {
                throw { message: `Email: ${user.email}, is already in use`};
            }

            const newUser = new this.userModel(createUserDto);
            await newUser.save();
    
            return newUser; 
            
        } catch (error) {
            
            return error.message;

        }
    }
    
    async findUserByEmail(email: string): Promise<UserInterface> {
        try {
            const user =  await this.userModel.findOne({ email });

            return user;

        } catch (error) {
            return error.message;
        }
    }
    
    async findUserById(userId: string): Promise<UserInterface>{
        try {
            const user = await this.userModel.findById(userId);
            
            return user;

        } catch (error) {

            return error.message;

        }
       
    }
    

   async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserInterface> {
        try {
            const updatedAt = Date.now();
            const updateUserBody = { ...updateUserDto, updated_at: updatedAt };
            const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserBody, { new: true });
            
            return updatedUser;
            
        } catch (error) {

            return error.message;
            
        }
   }

    async deleteUser(userId: string): Promise<UserInterface> {
        try {
            const userDeleted = await this.userModel.findByIdAndDelete(userId);

            return userDeleted;

        } catch (error) {

            return error.message;

        }
    }
}
