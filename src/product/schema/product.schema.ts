import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reference_code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }, 
    image_path: String,
    created_at: {
        type: Date,
        immutable: true,
        default: Date.now()
    },
    updated_at: Date
});