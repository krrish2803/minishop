import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model("Customer", customerSchema);
