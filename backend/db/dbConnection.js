import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL_REQUIRE === 'true', // converting string to boolean
        rejectUnauthorized: process.env.DB_SSL_REJECTUNAUTHORIZED === 'false', // converting string to boolean
      },
    },
  }
);

const DbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { DbConnection, sequelize };
