const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  name: DataTypes.STRING(255),
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = User;
