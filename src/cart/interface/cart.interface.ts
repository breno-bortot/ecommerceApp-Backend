import { ProductInterface } from "src/product/interface/product.interface";
import { UserInterface } from "src/user/interface/user.interface";

interface CartProductInterface {
    cartProductId: ProductInterface;
    quantity: number;
}

export interface CartInterface extends Document {
    customer_id: UserInterface;
    cartProducts: CartProductInterface[];
    cartTotal: number;
    checkoutDone: boolean;
    created_at: Date;
    updated_at: Date;
}