import { ProductInterface } from "src/product/interface/product.interface";
import { UserInterface } from "src/user/interface/user.interface";

interface CartProductInterface {
    cart_product_id: ProductInterface;
    quantity: number;
}

export interface CartInterface extends Document {
    customer_id: UserInterface;
    cart_sellers: object[];
    cart_products: CartProductInterface[];
    cart_total: number;
    checkout_done: boolean;
    created_at: Date;
    updated_at: Date;
}