import { Router } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.post('/register', async (req, res) => {
  const user = await User.create(req.body);
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET!);
  res.status(201).json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }});
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET!);
  res.json({ token });
});

export default router;