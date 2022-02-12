import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsString, ValidateIf } from "class-validator";
import * as sanitize from "sanitize-html";


export class CreateUserDto {
    @IsString()
    @Transform(({ value }) => sanitize(value, { disallowedTagsMode:"escape" }) )
    readonly name: string;

    @IsEmail()
    readonly email: string;
    
    @IsString()
    readonly password: string;

   @ValidateIf(CreateUserDto => CreateUserDto.seller )
   @IsBoolean()
    readonly seller?: boolean;
}