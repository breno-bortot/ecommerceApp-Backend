import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserInterface } from "src/user/interface/user.interface";
import { UserSwagger } from "src/user/swagger/user.swagger";

export class ProductSwagger {
    @ApiProperty({type: String, description: 'Object ID'})
    _id: string;

    @ApiProperty({type: () => UserSwagger, description: 'Object of the Seller'})
    seller_id: UserInterface;

    @ApiProperty({type: String, description: 'Unique reference-code of the product'})
    reference_code: string;

    @ApiProperty({type: String})
    name: string;

    @ApiPropertyOptional({type: String})
    description?: string;

    @ApiProperty({type: Number})
    price: number;

    @ApiProperty({type: Number})
    stock: number;

    @ApiPropertyOptional({type: String})
    imagePath?: string;

    @ApiProperty({type: Date})
    created_at: Date;

    @ApiProperty({type: Date})
    updated_at: Date;
}