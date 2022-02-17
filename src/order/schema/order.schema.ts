import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    order_customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    order_total: {
        type: Number,
        default: 0
    },
    payment_method: String,
    deliver_to: {
        country: String,
        state: String,
        city: String, 
        adress: String,
        zip_code: Number
    },
    delivery_fee: {
        type: Number,
        default: 67
    },
    created_at: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
});

OrderSchema.set('toJSON', {
    transform: (doc, { __v, ...rest}) => rest 
})