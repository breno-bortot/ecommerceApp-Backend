import { IsBoolean, IsDefined, IsEmail, IsString, ValidateIf } from "class-validator";

export class CreateUserDto {
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