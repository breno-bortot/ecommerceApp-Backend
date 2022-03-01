// import { OmitType, PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional, PartialType, OmitType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsString, ValidateIf } from "class-validator";
import * as sanitize from "sanitize-html";


export class CreateUserDto {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    @ApiProperty({type: String})
    readonly name: string;

    @IsEmail()
    @ApiProperty({type: String})
    readonly email: string;
    
    @IsString()
    @ApiProperty({type: String})
    readonly password: string;

   @ValidateIf(CreateUserDto => CreateUserDto.seller )
   @IsBoolean()
   @ApiPropertyOptional({type: Boolean, description: 'To define if user will be customer(value: null or false) or seller(value: true)'})
    readonly seller?: boolean;
}

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['password', 'seller'])
    ) {}

export class LoginDto extends OmitType(CreateUserDto, ['name', 'seller']) {}