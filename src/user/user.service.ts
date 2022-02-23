import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dtos';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserInterface> {
            const { email } = createUserDto;
            const user =  await this.userModel.findOne({ email });
    
            if (user) {
                throw new HttpException(`User already in use`, HttpStatus.BAD_REQUEST);
            }

            const newUser = new this.userModel(createUserDto);
            await newUser.save();
    
            return newUser; 
    }
    
    async findUserByEmail(email: string): Promise<UserInterface> {
            const user =  await this.userModel.findOne({ email });

            return user;
    }
    
    async findUserById(userId: string): Promise<UserInterface>{
        try {
            const user = await this.userModel.findById(userId);
            
            if (!user) {
                throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
            } 
            
            return user;
            
        } catch (error) {
            throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
        }     
    }
    
   async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserInterface> {
        try {
            const updatedAt = Date.now();
            const updateUserBody = { ...updateUserDto, updated_at: updatedAt };
            const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserBody, { new: true });
            console.log(updatedUser)

            if (!updatedUser) {
                throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
            }
            
            return updatedUser;
            
        } catch (error) {
            throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
        }
   }

    async deleteUser(userId: string): Promise<UserInterface> {
        try {
            const userDeleted = await this.userModel.findByIdAndDelete(userId);

            if (!userDeleted) {
                throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
            }

            return userDeleted;

        } catch (error) {   
            throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
        }
    }
}
