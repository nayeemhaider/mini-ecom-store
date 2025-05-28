import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export class Product extends Model {}

Product.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  thumbnailUrl: { type: DataTypes.STRING },
  images: { type: DataTypes.JSON },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { sequelize, modelName: 'product' });