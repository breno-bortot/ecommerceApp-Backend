import { Document } from "mongoose";
import { UserInterface } from "src/user/interface/user.interface";

export interface ProductInterface extends Document {
    seller_id: UserInterface;
    referenceCode: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    imagePath?: string;
    created_at: Date;
    updated_at: Date;
}