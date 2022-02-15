import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import * as sanitize from "sanitize-html";

export class ProductParams {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode: "escape"}): value)
    @IsString()
    productId: string;
}