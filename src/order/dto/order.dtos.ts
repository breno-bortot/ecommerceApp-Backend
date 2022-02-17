import { Transform, Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import * as sanitize from "sanitize-html";

class deliver_to {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly country: string;

    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly state: string;

    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly city: string;
  
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly adress: string;

    @IsNumber()
    readonly zip_code: number;
}

export class CreateOrderDto {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly cart_id: string;
   
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly payment_method: string;

    @ValidateNested()
    // Thank you Chanlito from gitHub!!! hehehe
    @Type(() => deliver_to)
    readonly deliver_to: deliver_to;
}