import {Request, Response} from 'express';
import Cart from '../models/Cart';
import Order from '../models/Order';


export const placeOrder = async (req: Request, res: Response) => {
    try {
        let cart = await Cart.findOne().populate('items.product');
        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        const newOrder = new Order({
            items: cart.items,
            total: cart.total,
        });

        const savedOrder = await newOrder.save();

        cart.items = [];
        cart.total = 0;
        await cart.save();

        res.redirect('/api/orders');
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).send('Error placing order');
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().populate('items.product');
        res.status(200).send(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Error fetching orders');
    }
};