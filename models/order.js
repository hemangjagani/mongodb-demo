const { getDB } = require("../utils/db");

class Order {
  constructor({ cart }) {
    this.cart = cart;
  }

  async createOrder() {
    const db = getDB();
    // add cart to orders
    await db.collection("orders").insertOne(this.cart);
    // Clean cart in users collection
    const cleanedCart = await db.collection("users").updateOne(
      { _id: this.cart.userId },
      { $set: { cart: [] } } // Clearing the cart array
    );
    return cleanedCart;
  }
}

module.exports = Order;
