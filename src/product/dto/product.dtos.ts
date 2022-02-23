import { PartialType, PickType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsNumber, IsString, ValidateIf } from "class-validator";
import * as sanitize from "sanitize-html";

export class CreateProductDto {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly reference_code: string;
    
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly name: string;

    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @ValidateIf(CreateUserDto => CreateUserDto.seller )
    @IsString()
    readonly description?: string;

    @Transform(({ value }) => typeof(value) === 'string' ? Number(value) : value)
    @IsNumber()
    readonly price: number;

    @Transform(({ value }) => typeof(value) === 'string' ? Number(value) : value)
    @IsNumber()
    readonly stock: number;
    
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @ValidateIf(CreateProductDto => CreateProductDto.imagePath
        )
    @IsString()
    imagePath?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto)  {}

export class ProductQueryDto extends PartialType(
    PickType(CreateProductDto, ['reference_code', 'name'])
) {}