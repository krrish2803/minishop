import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();

// Create Customer
router.post("/", async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.json(customer);
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({ error: "Customer with this email already exists" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

// Get Customers
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
