import { IsNumber, IsString, ValidateNested } from "class-validator";
import * as sanitize from "sanitize-html";
import { Transform, Type } from "class-transformer";
// import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, PartialType } from "@nestjs/swagger";

class CartProductDto { 
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    @ApiProperty({type: String})
    readonly cart_product_id: string;

    @IsNumber()
    @ApiProperty({type: String})
    readonly quantity: number;
}


export class CreateCartDto {
    @ValidateNested()
    // Thank you Chanlito from gitHub!!! hehehe
    @Type(() => CartProductDto)
    @ApiProperty({type: () => [CartProductDto]})
    readonly cart_products: CartProductDto[];
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}