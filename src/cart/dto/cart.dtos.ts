import { IsNumber, IsString, ValidateNested } from "class-validator";
import * as sanitize from "sanitize-html";
import { Transform, Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";

class CartProductDto { 
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly cartProductId: string;

    @IsNumber()
    readonly quantity: number;
}


export class CreateCartDto {
    @ValidateNested()
    // Thank you Chanlito from gitHub!!! hehehe
    @Type(() => CartProductDto)
    readonly cartProducts: CartProductDto;
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}