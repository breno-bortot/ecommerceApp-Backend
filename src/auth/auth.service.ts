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

            return this.loginUser(user); 

    }

    async registerUser(createUserDto: CreateUserDto): Promise<string> {
            const newUser = await this.userService.createUser(createUserDto);

            return this.loginUser(newUser);
    }

    private async loginUser(user: UserInterface): Promise<string> {
        try {
            const payload = { email: user.email, sub: user._id, seller: user.seller };
            const access_token = await this.jwtService.sign(payload)
            
            return access_token;

        } catch (error) {
            throw new HttpException(`Token service is not working`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

   
}
