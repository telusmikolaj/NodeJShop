import express from 'express';
import {addItemToCart, deleteItemFromCart, getCart} from '../controllers/cartController';

const router = express.Router();

router.post('/add', addItemToCart);
router.get('/', getCart);
router.post('/delete', deleteItemFromCart);

export default router;
