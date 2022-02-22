import { Injectable } from '@nestjs/common';
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

    async validateUser(loginDto: LoginDto): Promise<any> {
        try {
            const { email, password } = loginDto;
            const user = await this.userService.findUserByEmail(email);

            if (!user) {
                throw { message: `Invalid Credentials`};
            }

            const passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) {
                throw { message: `Invalid Credentials`};
            }

            return this.loginUser(user); 

        } catch (error) {
            return error.message;
        }
       

    }


    private async loginUser(user: UserInterface) {
        try {
            const payload = { email: user.email, sub: user._id, seller: user.seller };
            const access_token = await this.jwtService.sign(payload)
            
            return access_token;

        } catch (error) {
            return error.message;
        }
    }

    async registerUser(createUserDto: CreateUserDto) {

    }
}
