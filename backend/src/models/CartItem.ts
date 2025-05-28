import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { User } from './User';
import { Product } from './Product';

export class CartItem extends Model {}

CartItem.init({
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
}, { sequelize, modelName: 'cartItem' });

User.hasMany(CartItem);
CartItem.belongsTo(User);
Product.hasMany(CartItem);
CartItem.belongsTo(Product);