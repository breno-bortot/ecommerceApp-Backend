// import { PartialType, PickType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsObject, IsString, ValidateIf } from "class-validator";
import * as sanitize from "sanitize-html";

export class CreateProductDto {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    @ApiProperty({type: String, description: 'Product unique reference_code'})
    readonly reference_code: string;
    
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    @ApiProperty({type: String})
    readonly name: string;

    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @ValidateIf(CreateUserDto => CreateUserDto.seller )
    @IsString()
    @ApiProperty({type: String})
    readonly description?: string;

    @Transform(({ value }) => typeof(value) === 'string' ? Number(value) : value)
    @IsNumber()
    @ApiProperty({type: Number})
    readonly price: number;

    @Transform(({ value }) => typeof(value) === 'string' ? Number(value) : value)
    @IsNumber()
    @ApiProperty({type: Number})
    readonly stock: number;
    
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @ValidateIf(CreateProductDto => CreateProductDto.imagePath)
    @IsString()
    @ApiPropertyOptional({type: String, description: 'Image Path in case of external source'})
    imagePath?: string;
    
    @ValidateIf(CreateProductDto => CreateProductDto.image)
    @IsObject()
    @ApiPropertyOptional({type: String, format: 'binary', description: 'Image to upload'})
    image?: any;
}

export class UpdateProductDto extends PartialType(CreateProductDto)  {}

export class ProductQueryDto extends PartialType(
    PickType(CreateProductDto, ['reference_code', 'name'])
) {}