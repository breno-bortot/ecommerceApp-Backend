import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import * as sanitize from "sanitize-html";

export class ProductParams {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode: "escape"}): value)
    @IsString()
    @ApiProperty({type: String})
    product_id: string;
}