'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConnection.js';

class Todo extends Model {
  static associate(models) {
    // Each Todo belongs to a User using the "userId" field.
    Todo.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

Todo.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Todo',
  }
);

export default Todo;
