import express from 'express';
import {getOrders, placeOrder} from "../controllers/orderController";
import Order from "../models/Order";

const router = express.Router();

router.post('/', placeOrder);
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}).populate('items.product');
        res.render('orders', { orders });
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Error fetching orders');
    }
});

export default router;
