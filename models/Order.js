import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    customer_id: {
        type: String,
        required: true
    },
    products: [
        {
            product_id: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    total_amount: {
        type: Number,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
