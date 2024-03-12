const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/db");

class Cart {
  constructor({ userId, productId }) {
    this.userId = userId ? ObjectId.createFromHexString(userId) : null;
    this.productId = productId ? ObjectId.createFromHexString(productId) : null;
  }

  async addToCart() {
    const db = getDB();

    // Verify if the product exists in the products collection
    const product = await db
      .collection("products")
      .findOne({ _id: this.productId });
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if product exists in the user's cart
    const existProduct = await db.collection("users").findOne({
      "cart.productId": this.productId,
    });
    let updateUserCart;
    if (existProduct) {
      // If the product exists, update the quantity
      updateUserCart = await db
        .collection("users")
        .updateOne(
          { _id: this.userId, "cart.productId": this.productId },
          { $inc: { "cart.$.quantity": 1 } }
        );
    } else {
      // If the product doesn't exist, add it with quantity 1
      updateUserCart = await db
        .collection("users")
        .updateOne(
          { _id: this.userId },
          { $push: { cart: { productId: this.productId, quantity: 1 } } }
        );
    }
    if (updateUserCart.modifiedCount === 1) {
      // Fetch the updated user document to get the updated cart
      const updatedUser = await db
        .collection("users")
        .findOne({ _id: this.userId });
      // Return the updated cart
      return updatedUser.cart;
    } else {
      throw new Error("Cart not updated");
    }
  }

  async removeFromCart() {
    try {
      const db = getDB();
      const user = await db.collection("users").findOne({ _id: this.userId });
      if (!user) {
        throw new Error("User not found");
      }
      const cartItem = await db.collection("users").findOne({ "cart.productId": this.productId},{projection: {cart:1,_id:0}});
      const product = cartItem?.cart?.[0];
      if (!product) {
        throw new Error("Product not found in the cart");
      }
      let updateQuery;
      if (product.quantity === 1) {
        // If quantity is 1, remove the product from the cart
        updateQuery = db
          .collection("users")
          .updateOne(
            { _id: this.userId },
            { $pull: { cart: { productId: this.productId } } }
          );
      } else {
        // If quantity is greater than 1, decrement the quantity
        updateQuery = db
          .collection("users")
          .updateOne(
            { _id: this.userId, "cart.productId": this.productId },
            { $inc: { "cart.$.quantity": -1 } }
          );
      }
      const result = await updateQuery;
      if (result.modifiedCount === 1) {
        // Fetch the updated user document to get the updated cart
        const updatedUser = await db
          .collection("users")
          .findOne({ _id: this.userId });
        // Return the updated cart
        return updatedUser.cart;
      } else {
        throw new Error("Product not found in the cart");
      }
    } catch (error) {
      console.log("###error", error);
      throw error;
    }
  }

  async getCartDetails() {
    try {
      const db = getDB();
      // find user data
      const user = await db
        .collection("users")
        .findOne({ _id: this.userId }, { projection: { cart: 1, _id: 0 } });
      return user.cart;
    } catch (error) {
      console.log("###error", error);
      throw error;
    }
  }
}

module.exports = Cart;
