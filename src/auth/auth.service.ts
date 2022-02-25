import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from 'src/user/dto/user.dtos';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/user/interface/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(loginDto: LoginDto): Promise<string> {
            const { email, password } = loginDto;
            const user = await this.userService.findUserByEmail(email);

            if (!user) {
                throw new HttpException(`Invalid Credentials`, HttpStatus.BAD_REQUEST);
            }

            const passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) {
                throw new HttpException(`Invalid Credentials`, HttpStatus.BAD_REQUEST);
            }

            return this.signUser(user); 

    }

    async registerUser(createUserDto: CreateUserDto): Promise<string> {
            const newUser = await this.userService.createUser(createUserDto);

            return this.signUser(newUser);
    }

    addCartIdToUser(user, cartId) {
        user.cart_id = cartId;

        return this.signUser(user);
    }

    private async signUser(user): Promise<string> {
        try {
            const payload = { 
                sub: user._id || user.sub, 
                seller: user.seller, 
                cart_id: user.cart_id 
            };
            const access_token = await this.jwtService.sign(payload)
            
            return access_token;

        } catch (error) {
            throw new HttpException(`Token service is not working`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

   
}
