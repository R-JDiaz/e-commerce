import express from 'express';

import userRoutes from './features/user/user.routes.js'
import productRoutes from "./features/products/product.routes.js";
import cartRoutes from "./features/cart/cart.routes.js";
import orderRoutes from "./features/order/order.routes.js";
import paymentRoutes from "./features/payment/payment.routes.js";

import { globalErrorHandler } from './common/utilities/handler.js';
const app = express();


app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

app.use(globalErrorHandler);

export default app;