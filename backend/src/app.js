import express from 'express';

import userRoutes from './features/user/user.routes.js'
import productRoutes from "./features/products/product.routes.js";
import cartRoutes from "./features/cart/cart.routes.js";
const app = express();


app.use(express.json());


app.use("/products", productRoutes);
app.use('/users', userRoutes);
app.use('/carts', cartRoutes);


export default app;