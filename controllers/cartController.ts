import express from 'express';
import { Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';

export const addItemToCart = async (req: express.Request, res: express.Response) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [], total: 0 });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        const lineTotal = product.price * quantity;
        console.log(itemIndex);

        if (itemIndex > -1) {
            const existingItem = cart.items[itemIndex];
            existingItem.quantity += quantity;
            existingItem.lineTotal = existingItem.price * existingItem.quantity;
            cart.total += existingItem.price * quantity;
        } else {
            const newItem = { product: productId, name: product.name, price: product.price, quantity, lineTotal };
            console.log(newItem);
            cart.items.push(newItem);
            cart.total += newItem.lineTotal;
        }

        await cart.save();
        cart = await Cart.findOne().populate('items.product');
        if (cart) {
            res.render('cart', {items: cart.items, total: cart.total});
        } else {
            res.status(404).send('Cart not found');
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send('An error occurred while adding item to cart');
    }
};

export const getCart = async(req: Request, res: Response) => {
    try {
        let cart = await Cart.findOne().populate('items.product');
        if (!cart) {
            console.log(cart);
            cart = new Cart({ items: [] });
        }
        res.render('cart', { items: cart.items, total: cart.total });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching the cart');
    }
};

export const deleteItemFromCart = async (req: express.Request, res: express.Response) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).send('Product not found in cart');
        }

        cart.total -= cart.items[itemIndex].lineTotal;
        cart.items.splice(itemIndex, 1);
        await cart.save();
        cart = await Cart.findOne().populate('items.product');
        if (cart) {
            res.render('cart', {items: cart.items, total: cart.total});
        } else {
            res.status(404).send('Cart not found');
        }

    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).send('An error occurred while deleting item from cart');
    }
};