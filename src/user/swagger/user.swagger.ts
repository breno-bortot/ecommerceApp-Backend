import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserSwagger {
    @ApiProperty({type: String, description: 'Object ID'})
    _id: string;

    @ApiProperty({type: String})
    name: string;

    @ApiProperty({type: String})
    email: string;

    @ApiPropertyOptional({type: Boolean, description: 'Defines if user is a customer(value: null or false) or a seller(value: true)'})
    seller?: boolean;

    @ApiProperty({type: Date})
    created_at: Date;

    @ApiProperty({type: Date})
    updated_at?: Date;
}