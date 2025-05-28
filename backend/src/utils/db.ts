// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();

// export const sequelize = new Sequelize(
//   process.env.DB_NAME!,
//   process.env.DB_USER!,
//   process.env.DB_PASS!,
//   {
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     dialect: 'mysql'
//   }
// );

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/dev.sqlite',
  logging: false,   // turn off verbose SQL logs
});
