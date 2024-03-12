// const { DataTypes} = require("sequelize");
const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/db");

class Product {
  constructor({
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
    id,
  }) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.discountPercentage = discountPercentage;
    this.rating = rating;
    this.stock = stock;
    this.brand = brand;
    this.category = category;
    this.thumbnail = thumbnail;
    this.images = images;
    this.id = id ? ObjectId.createFromHexString(id) :null;
  }

  static async fetchAll() {
    const db = getDB();
    try {
      const response = await db.collection("products").find().toArray();
      return response;
    } catch (error) {
      console.error("Error saving product:", error);
    }
  }

  static async findById(productId) {
    const db = getDB();
    try {
      const response = await db
        .collection("products")
        .findOne({ _id: ObjectId.createFromHexString(productId) });
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Rethrow the error to handle it outside if needed
    }
  }
  static async deleteById(productId) {
    const db = getDB();
    try {
      const response = await db
        .collection("products")
        .deleteOne({ _id: ObjectId.createFromHexString(productId) });
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Rethrow the error to handle it outside if needed
    }
  }

  async save() {
    const db = getDB();
    try {
      if (this.id) {
        await db
          .collection("products")
          .updateOne({ _id: this.id }, { $set: this });
        return this;
      } else {
        const response = await db.collection("products").insertOne(this);
        return {
          _id: response.insertedId,
          ...this,
        };
      }
    } catch (error) {
      console.error("Error saving product:", error);
      throw error;
    }
  }
}

// const Product = sequelize.define("product", {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   title: {
//     type: DataTypes.CHAR(250),
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   images: {
//     type: DataTypes.ARRAY(DataTypes.TEXT),
//     allowNull: true,
//   },
//   price: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   discount_percentage: {
//     type: DataTypes.INTEGER,
//   },
//   rating: {
//     type: DataTypes.INTEGER,
//   },
//   stock: {
//     type: DataTypes.INTEGER,
//   },
//   brand: {
//     type: DataTypes.TEXT,
//   },
//   category: {
//     type: DataTypes.TEXT,
//   },
//   thumbnail: {
//     type: DataTypes.TEXT,
//   },
// });

module.exports = Product;
