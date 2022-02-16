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
    cartTotal: {
        type: Number,
        default: 0
    },
    checkoutDone: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updated_at: {
        type: Date,
        default: () => Date.now()
       }
});

CartSchema.set('toJSON', {
    transform: (doc, { __v, ...rest}) => rest 
})