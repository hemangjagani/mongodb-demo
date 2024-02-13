const Cart = require("../models/cart");

exports.getCartDetails = (req, res, next) => {
  Cart.fetchCart(({ message, cart }) => {
    if (cart) res.status(200).json({ message, cart });
    else res.status(400).json({ message });
  });
};

exports.addProduct = (req, res) => {
  Cart.addProduct(req.body.productId, ({ message, cart }) => {
    if (cart) res.status(200).json({ message, cart });
    else res.status(400).json({ message });
  });
};

exports.deleteProduct = (req, res) => {
  Cart.removeProduct(req.params.productId, ({ message, cart }) => {
    if (cart) res.status(200).json({ message, cart });
    else res.status(400).json({ message });
  });
};
