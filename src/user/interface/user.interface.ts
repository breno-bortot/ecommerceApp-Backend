import { Document } from "mongoose";


export interface UserInterface extends Document {
    name: string;
    email: string;
    readonly password: string;
    seller?: boolean;
    created_at: Date;
    updated_at?: Date;
}