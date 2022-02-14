import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsString, ValidateIf } from "class-validator";
import * as sanitize from "sanitize-html";


export class CreateUserDto {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;
    
    @IsString()
    readonly password: string;

   @ValidateIf(CreateUserDto => CreateUserDto.seller )
   @IsBoolean()
    readonly seller?: boolean;
}

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['password', 'seller'])
    ) {}

export class LoginDto extends OmitType(CreateUserDto, ['name', 'seller']) {}