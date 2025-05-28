import { sequelize } from './utils/db';
import { Product } from './models/Product';

async function seed() {
  await sequelize.sync({ force: true });  // drops & recreates tables
  await Product.bulkCreate([
    {
      name: 'Basic T-Shirt',
      description: '100% cotton, cool and comfortable.',
      price: 19.99,
      thumbnailUrl: '',
      images: [],
      stock: 50
    },
    {
      name: 'Stylish Mug',
      description: 'Ceramic mug for hot beverages.',
      price: 9.95,
      thumbnailUrl: '',
      images: [],
      stock: 100
    }
  ]);
  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
