import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
