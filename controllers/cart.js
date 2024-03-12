const Cart = require("../models/cart");

exports.getCartDetails = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const cart = new Cart({ userId });
    const cartDetails = await cart.getCartDetails();
    res.status(200).json({ success: true, cart: cartDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const productId = req.body.productId;
    const userId = req.body.userId;
    const cart = new Cart({ productId, userId });
    const updatedCart = await cart.addToCart();
    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.query.userId;
    const cart = new Cart({ productId, userId });
    const updatedCart = await cart.removeFromCart();    
    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    console.log("###error", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
