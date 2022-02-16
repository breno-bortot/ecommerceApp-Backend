import { IsNumber, IsString, ValidateNested } from "class-validator";
import * as sanitize from "sanitize-html";
import { Transform, Type } from "class-transformer";

class ProductCartDto { 
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly productId: string;

    @IsNumber()
    readonly quantity: number;
}


export class CreateCartDto {
    @ValidateNested()
    // Thank you Chanlito from gitHub!!! hehehe
    @Type(() => ProductCartDto)
    readonly products: ProductCartDto;
}