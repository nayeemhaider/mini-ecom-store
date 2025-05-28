// src/routes/cart.ts

import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { CartItem } from '../models/CartItem';

// Extend Express.Request so TS knows `req.user` exists
interface AuthRequest extends Request {
  user: User;
}

const router = Router();

// Authentication middleware
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

    // Attach user to request for downstream handlers
    (req as unknown as AuthRequest).user = user;
    next();
  }
);

// GET /api/cart
router.get('/', async (req, res: Response) => {
  const { user } = (req as unknown as AuthRequest);
  const items = await CartItem.findAll({
    where: { userId: user.id },
    include: ['product']
  });
  res.json({ items });
});

// POST /api/cart
router.post('/', async (req, res: Response) => {
  const { user } = (req as unknown as AuthRequest);
  const { productId, quantity } = req.body;
  const item = await CartItem.create({
    userId: user.id,
    productId,
    quantity
  });
  res.status(201).json(item);
});

// PUT /api/cart/:productId
router.put('/:productId', async (req, res: Response) => {
  const { user } = (req as unknown as AuthRequest);
  const { quantity } = req.body;
  await CartItem.update(
    { quantity },
    {
      where: {
        userId: user.id,
        productId: req.params.productId
      }
    }
  );
  res.json({});
});

// DELETE /api/cart/:productId
router.delete('/:productId', async (req, res: Response) => {
  const { user } = (req as unknown as AuthRequest);
  await CartItem.destroy({
    where: {
      userId: user.id,
      productId: req.params.productId
    }
  });
  res.status(204).end();
});

export default router;
