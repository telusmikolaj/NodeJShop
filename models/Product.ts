import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    inStock: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

export default Product;