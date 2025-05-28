import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';
import bcrypt from 'bcryptjs';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'user' });

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});