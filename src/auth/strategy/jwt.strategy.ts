import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Request } from "express";
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    let token = request.cookies['USER_TOKEN'];
                    
                    return token;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY        
        });
    }
    
    async validate(payload: any) {
        return payload;
    }
}