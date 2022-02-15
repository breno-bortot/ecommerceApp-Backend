import { PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsNumber, IsString, ValidateIf } from "class-validator";
import * as sanitize from "sanitize-html";

export class CreateProductDto {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly referenceCode: string;
    
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    readonly name: string;

    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @ValidateIf(CreateUserDto => CreateUserDto.seller )
    @IsString()
    readonly description?: string;

    @IsNumber()
    readonly price: number;

    @IsNumber()
    readonly stock: number;

    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @ValidateIf(CreateUserDto => CreateUserDto.seller )
    @IsString()
    readonly imagePath?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto)  {}