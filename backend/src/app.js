import express from 'express';

import userRoutes from './features/user/user.routes.js'
import productRoutes from "./features/products/product.routes.js";
import cartRoutes from "./features/cart/cart.routes.js";
import orderRoutes from "./features/order/order.routes.js";
import paymentRoutes from "./features/payment/payment.routes.js";

import { globalErrorHandler } from './common/utilities/handler.js';
const app = express();


app.use(express.json());


app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/payment', paymentRoutes);

app.use(globalErrorHandler);

export default app;