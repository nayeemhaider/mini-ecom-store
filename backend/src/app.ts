import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './utils/db';
import authRouter from './routes/auth';
import productsRouter from './routes/products';
import cartRouter from './routes/cart';
import ordersRouter from './routes/orders';
import paymentsRouter from './routes/payments';

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);

// DB sync & server start
sequelize.sync({ alter: true }).then(() => {
  app.listen(8000, () => console.log('Backend running on port 8000'));
});