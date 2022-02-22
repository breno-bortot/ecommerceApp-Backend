import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '15m'}
    })
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
 