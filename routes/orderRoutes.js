import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ➤ Place Order
router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Get All Orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Total Sales per Product
router.get("/sales", async (req, res) => {
    try {
        const result = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.product_id",
                    total_quantity: { $sum: "$products.quantity" },
                    total_sales: { $sum: "$total_amount" }
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Most Purchased Product
router.get("/top-product", async (req, res) => {
    try {
        const result = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.product_id",
                    total_quantity: { $sum: "$products.quantity" }
                }
            },
            { $sort: { total_quantity: -1 } },
            { $limit: 1 }
        ]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
