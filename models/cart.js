const fs = require("fs");
const path = require("path");
const Product = require("./product");

const cartFilePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static addProduct(productId, cb) {
    fs.readFile(cartFilePath, (err, cartData) => {
      if (err) {
        console.error("Error reading cart file:", err);
        cb({ message: "Something went wrong!" });
        return;
      }

      const cart = JSON.parse(cartData);
      Product.fetchProduct(productId, (product) => {
        if (!product) {
          console.error("Product not found with ID:", productId);
          cb({ message: "Product not found!" });
          return;
        }

        const existingProductIndex = cart.products.findIndex(
          (prod) => prod.id === productId
        );
        if (existingProductIndex === -1) {
          cart.products.push({
            id: productId,
            quantity: 1,
          });
        } else {
          cart.products[existingProductIndex].quantity++;
        }
        cart.totalPrice += product.price;

        fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
          if (err) {
            console.error("Error writing to cart file:", err);
            cb({ message: "Something went wrong!" });
          } else {
            cb({ message: "Product added sucessfully!", cart });
          }
        });
      });
    });
  }

  static removeProduct(productId, cb) {
    fs.readFile(cartFilePath, (err, cartData) => {
      if (err) {
        console.error("Error reading cart file:", err);
        cb({ message: "Something went wrong!" });
        return;
      }

      const cart = JSON.parse(cartData);
      Product.fetchProduct(productId, (product) => {
        if (!product) {
          console.error("Product not found with ID:", productId);
          cb({ message: "Product not found!" });
          return;
        }

        const existingProduct = cart.products.find(
          (prod) => prod.id === productId
        );
        if (!existingProduct) {
          cb({ message: "Product not found!" });
        } else {
          const removedPrice = product.price * existingProduct.quantity;

          cart.totalPrice -= removedPrice;
          cart.products = cart.products.filter((item) => item.id !== productId);
        }

        fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
          if (err) {
            cb({ message: "Something went wrong!" });
          } else {
            cb({ message: "Product removed sucessfully!", cart });
          }
        });
      });
    });
  }

  static fetchCart(cb) {
    fs.readFile(cartFilePath, (err, cartData) => {
      if (err) {
        console.error("Error reading cart file:", err);
        cb({ message: "Something went wrong!" });
        return;
      } else {
        const cart = JSON.parse(cartData);
        cb({ cart });
      }
    });
  }
};
