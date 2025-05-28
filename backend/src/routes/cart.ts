import { Router } from 'express';
import { CartItem } from '../models/CartItem';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = Router();

// Middleware to extract user
router.use(async (req, res, next) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).end();
  const payload: any = jwt.verify(auth, process.env.JWT_SECRET!);
  req.user = await User.findByPk(payload.id);
  next();
});

router.get('/', async (req, res) => {
  const items = await CartItem.findAll({ where: { userId: req.user.id }, include: ['product'] });
  res.json({ items });
});

router.post('/', async (req, res) => {
  const item = await CartItem.create({ userId: req.user.id, productId: req.body.productId, quantity: req.body.quantity });
  res.status(201).json(item);
});

router.put('/:productId', async (req, res) => {
  await CartItem.update({ quantity: req.body.quantity }, { where: { userId: req.user.id, productId: req.params.productId }});
  res.json({});
});

router.delete('/:productId', async (req, res) => {
  await CartItem.destroy({ where: { userId: req.user.id, productId: req.params.productId }});
  res.status(204).end();
});

export default router;