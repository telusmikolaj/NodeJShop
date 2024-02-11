import express from 'express';
import {listProducts, addProduct, getProduct} from '../controllers/productController';

const router = express.Router();

router.get('/', listProducts);
router.get('/addProduct', (req, res) => {
    res.render('addProduct');
});
router.get('/:id', getProduct);
router.post('/', addProduct);

export default router;