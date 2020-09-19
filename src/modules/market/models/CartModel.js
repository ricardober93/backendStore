import {
    Schema,
    model
} from "mongoose";

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const cartSchema = new Schema({
    total_discount: {
        type: Number,
    },
    total_price: {
        type: Number,
        required: true,
    },
    order_date: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true
    },
    arrived_date: {
        type: String,
    },
    state: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },
}, schemaOptions)

const Cart = model('cart', cartSchema);

module.exports = Cart;