import { Router } from 'express';
import { Product } from '../models/Product';

const router = Router();

router.get('/', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  const products = await Product.findAll({ offset, limit: Number(limit) });
  res.json({ data: products });
});

router.get('/:id', async (req, res) => {
  const prod = await Product.findByPk(req.params.id);
  if (!prod) return res.status(404).end();
  res.json(prod);
});

export default router;