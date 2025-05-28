import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import { User } from './User';

export class Order extends Model {}

Order.init({
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  total: { type: DataTypes.FLOAT, allowNull: false },
  shippingAddress: { type: DataTypes.JSON }
}, { sequelize, modelName: 'order' });

User.hasMany(Order);
Order.belongsTo(User);