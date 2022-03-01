import { ApiProperty } from "@nestjs/swagger";
import { CartSellerSwagger } from "src/cart/swagger/cart.swagger";
import { UserSwagger } from "src/user/swagger/user.swagger";

class DeliverToSwagger {
    @ApiProperty({type: String})
    country: string;
    
    @ApiProperty({type: String})
    state: string;

    @ApiProperty({type: String})
    city: string;

    @ApiProperty({type: String})
    adress: string;

    @ApiProperty({type: Number})
    zip_code: number;
}

export class OrderListSwagger {
    @ApiProperty({type: String, description: 'Object ID'})
    _id: string;
    
    @ApiProperty({type: String} )
    order_customer_id: string;

    @ApiProperty({type: [CartSellerSwagger], description: 'List of the Sellers whose products were add to cart'})
    order_sellers: object[];

    @ApiProperty({type: String})
    cart_id: string;
    
    @ApiProperty({type: Number})
    order_total: number;

    @ApiProperty({type: String})
    payment_method: string;

    @ApiProperty({type: DeliverToSwagger})
    deliver_to: Object;

    @ApiProperty({type: Number})
    delivery_fee: number;

    @ApiProperty({type: Date})
    created_at: Date;
}

export class OrderDetailsSwagger {
    @ApiProperty({type: String, description: 'Object ID'})
    _id: string;
    
    @ApiProperty({type: () => UserSwagger, description: 'Customer Object'} )
    order_customer_id: Object;

    @ApiProperty({type: [CartSellerSwagger], description: 'List of the Sellers whose products were add to cart'})
    order_sellers: object[];

    @ApiProperty({type: String})
    cart_id: CartSellerSwagger;
    
    @ApiProperty({type: Number})
    order_total: number;

    @ApiProperty({type: String})
    payment_method: string;

    @ApiProperty({type: DeliverToSwagger})
    deliver_to: Object;

    @ApiProperty({type: Number})
    delivery_fee: number;

    @ApiProperty({type: Date})
    created_at: Date;
}