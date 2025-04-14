// models/index.js
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import config from '../config/config.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const db = {};

const sequelize = new Sequelize(config[env]);

const initModels = async () => {
  const files = fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== path.basename(__filename) &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
    );

  for (const file of files) {
    const model = await import(path.join(__dirname, file));
    const modelInstance = model.default(sequelize, DataTypes);
    db[modelInstance.name] = modelInstance;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

initModels();

export default db;
