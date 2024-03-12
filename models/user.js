const { getDB } = require("../utils/db");
const { ObjectId } = require("mongodb");

class User {
  constructor({ username, email, password }) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async save() {
    try {
      const db = getDB();
      const createdUser = await db.collection("users").insertOne(this);
      return {
        _id: createdUser.insertedId,
        ...this,
      };
    } catch (error) {
      console.log("###error", error);
    }
  }

  static async findAll() {
    try {
      const db = getDB();
      const response = await db.collection("users").find().toArray();
      return response;
    } catch (error) {
      console.log("###error", error);
    }
  }

  static async findById(userId) {
    try {
      const db = getDB();
      const response = await db
        .collection("users")
        .findOne(
          { _id: ObjectId.createFromHexString(userId) },
          { projection: { password: 0 } }
        );
      return response;
    } catch (error) {
      console.log("###error", error);
    }
  }
}

module.exports = User;
