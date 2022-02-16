import { ProductInterface } from "src/product/interface/product.interface";
import { UserInterface } from "src/user/interface/user.interface";

interface ProductCartInterface {
    product: ProductInterface;
    quantity: number;
}

export interface CartInterface extends Document {
    customer_id: UserInterface;
    products: ProductCartInterface[];
    cartTotal: number;
    checkoutDone: boolean;
    created_at: Date;
    updated_at: Date;
}