import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import * as sanitize from "sanitize-html";

class DeliverTo {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    @ApiProperty({type: String, description: 'country'})
    readonly country: string;

    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    @ApiProperty({type: String, description: 'state'})
    readonly state: string;

    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    @ApiProperty({type: String, description: 'city'})
    readonly city: string;
  
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    @ApiProperty({type: String, description: 'adress'})
    readonly adress: string;

    @IsNumber()
    @ApiProperty({type: Number, description: 'zip_code'})
    readonly zip_code: number;
}

export class CreateOrderDto {
    @Transform(({ value }) => typeof(value) === 'string' ? sanitize(value, { disallowedTagsMode:"escape" }) : value)
    @IsString()
    @ApiProperty({type: String, description: 'payment_method'})
    readonly payment_method: string;

    @ValidateNested()
    // Thank you Chanlito from gitHub!!! hehehe
    @Type(() => DeliverTo)
    @ApiProperty({type: () => DeliverTo})
    readonly deliver_to: DeliverTo;
}