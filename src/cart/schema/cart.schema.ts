import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
   customer_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
   },
   products: [
        {
            product_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ],
    cart_total: {
        type: Number,
        default: 0
    },
    checkout_done: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updated_at: Date
});