import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { ProductSwagger } from "src/product/swagger/product.swagger";
import { UserSwagger } from "src/user/swagger/user.swagger";

class CartProductSwagger {
    @ApiProperty({type: () => ProductSwagger, description: 'Product Object'} )
    cart_product_id: Object;

    @ApiProperty({type: Number})
    quantity: number;
}

export class CartSellerSwagger {
    @ApiProperty({type: String})
    seller_id: string
}


export class CreateCartSwagger {
    @ApiProperty({type: String, description: 'Object ID'})
    _id: string;

    @ApiProperty({type: UserSwagger})
    customer_id: Object;

    @ApiProperty({type: [CartSellerSwagger], description: 'List of the Sellers whose products were add to cart'})
    cart_sellers: object[];

    @ApiProperty({type: [CartProductSwagger]})
    cart_products: Object[];
    
    @ApiProperty({type: Number})
    cart_total: number;

    @ApiProperty({type: Boolean})
    checkout_done: boolean;

    @ApiProperty({type: Date})
    created_at: Date;

    @ApiProperty({type: Date})
    updated_at: Date;
} 

export class CleanCartSwagger {
    @ApiProperty({type: String, description: 'Object ID'})
    _id: string;

    @ApiProperty({type: UserSwagger})
    customer_id: Object;

    @ApiProperty({type: [Object], description: 'List of the Sellers whose products were add to cart'})
    cart_sellers: object[];

    @ApiProperty({type: [Object]})
    cart_products: Object[];
    
    @ApiProperty({type: Number})
    cart_total: number;

    @ApiProperty({type: Boolean})
    checkout_done: boolean;

    @ApiProperty({type: Date})
    created_at: Date;

    @ApiProperty({type: Date})
    updated_at: Date;
}