import mongoose, {Document} from 'mongoose';

interface CartItem {
    product: mongoose.Schema.Types.ObjectId;
    price: number;
    quantity: number;
    lineTotal: number;
}

export interface ICart extends Document {
    items: CartItem[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

const cartSchema = new mongoose.Schema({
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, name: String, ref: 'Product', required: true},
        price: {type: Number},
        quantity: {type: Number, min: 1},
        lineTotal: {type: Number}
    }],
    total: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}, {
    timestamps: true
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;
