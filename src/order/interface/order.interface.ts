import { CartInterface } from "src/cart/interface/cart.interface";
import { UserInterface } from "src/user/interface/user.interface";

interface deliver_toInterface {
    country: string;
    state: string;
    city: string;
    adress: string;
    zip_code: number;
}

export interface OrderInterface extends Document {
    order_customer_id: UserInterface;
    order_sellers: object[];
    cart_id: CartInterface;
    order_total: number;
    payment_method: string;
    deliver_to: deliver_toInterface;
    delivery_fee: number;
    created_at: Date;
}