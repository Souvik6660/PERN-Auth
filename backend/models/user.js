'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConnection.js';

class User extends Model {
  static associate(models) {
    // Each User can have many Todos.
    // The Todo model's "userId" field references the User's "id".
    User.hasMany(models.Todo, { foreignKey: 'userId', as: 'Todos' });
  }
}

User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Auto-generates UUID
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: 'Fullname must be at least 3 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Password must be at least 6 characters long',
        },
        isComplex(value) {
          const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
          if (!regex.test(value)) {
            throw new Error(
              'Password must be at least 6 characters long, with at least one uppercase letter and one special character.'
            );
          }
        },
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    vOTP: {
      type: DataTypes.STRING,
    },
    otpExpiresAt: {
      type: DataTypes.DATE,
    },
    profileImage: {
      type: DataTypes.STRING,
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
    modelName: 'User',
  }
);

export default User;
