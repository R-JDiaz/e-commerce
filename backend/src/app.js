import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./features/auth/auth.routes.js";
import userRoutes from './features/user/user.routes.js'
import productRoutes from "./features/products/product.routes.js";
import cartRoutes from "./features/cart/cart.routes.js";
import orderRoutes from "./features/order/order.routes.js";
import paymentRoutes from "./features/payment/payment.routes.js";
import categoryRoutes from "./features/category/category.routes.js";
import reviewRoutes from "./features/review/review.routes.js";
import notificationRoutes from "./features/notification/notification.routes.js";
import supportRoutes from "./features/support/support.routes.js";

import { globalErrorHandler } from './common/utilities/handler.js';
const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/support', supportRoutes);

app.use(globalErrorHandler);

export default app;
