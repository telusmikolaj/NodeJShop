import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            name: String,
            ref: 'Product'
        },
        quantity: Number,
        lineTotal: Number
    }],
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;