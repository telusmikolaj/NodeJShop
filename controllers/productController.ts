import {Request, Response} from 'express';

import Product from '../models/Product';

export const listProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.render('products', {products: products});
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching products');
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('productDetails', {product: product});
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching the product');
    }
};

export const addProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = new Product(req.body);
        console.log(newProduct);
        await newProduct.save();
        res.redirect('/api/products');
    } catch (err) {
        console.error(err);
        res.status(400).send('An error occurred while creating product');
    }
};