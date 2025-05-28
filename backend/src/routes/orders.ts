import { Router } from 'express';
import { Order } from '../models/Order';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = Router();
router.use(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).end();
  const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
  req.user = await User.findByPk(payload.id);
  next();
});

router.post('/', async (req, res) => {
  const order = await Order.create({ userId: req.user.id, total: req.body.total, shippingAddress: req.body.shippingAddress });
  res.status(201).json(order);
});

router.get('/', async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.user.id } });
  res.json({ orders });
});

router.get('/:id', async (req, res) => {
  const order = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!order) return res.status(404).end();
  res.json(order);
});

export default router;