import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as path from "path";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";


const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || '', {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));   // Set the views directory
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(3000,  () => {
    console.log('Server is running on port 3000');
});