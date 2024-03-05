const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  }
});

module.exports = CartItem;
