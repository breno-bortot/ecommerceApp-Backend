import { randomBytes, randomFill, randomInt } from 'crypto';
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    order_number: {
        type: Number,
        index: true
    },
    order_total: Number,
    payment_Methods: String,
    deliver_to: {
        country: String,
        state: String,
        city: String, 
        adress: String,
        zip_code: Number
    },
    created_at: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
});