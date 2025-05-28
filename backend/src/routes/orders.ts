// src/routes/orders.ts

import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Order } from '../models/Order';

interface AuthRequest extends Request {
  user: User;
}

const router = Router();

// Authentication middleware (same as cart)
router.use(
  async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = header.split(' ')[1];
    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    (req as AuthRequest).user = user;
    next();
  }
);

// POST /api/orders
router.post('/', async (req: Request, res: Response) => {
  const { user } = req as AuthRequest;
  const { total, shippingAddress } = req.body;
  const order = await Order.create({
    userId: user.id,
    total,
    shippingAddress
  });
  res.status(201).json(order);
});

// GET /api/orders
router.get('/', async (req: Request, res: Response) => {
  const { user } = req as AuthRequest;
  const orders = await Order.findAll({
    where: { userId: user.id }
  });
  res.json({ orders });
});

// GET /api/orders/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { user } = req as AuthRequest;
  const order = await Order.findOne({
    where: { id: req.params.id, userId: user.id }
  });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

export default router;
