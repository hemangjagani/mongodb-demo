const { Order } = require("../models");

exports.postOrders = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();
    console.log("###order", order);
    const ordersItem = await order.addProducts(products.map((product) => {
      product.orderItem = { quantity: product.cartItem.quantity }
      return product;
    }));
    await cart.setProducts(null)
    console.log("###ordersItem", ordersItem);
    return res.status(200).json({
      message: "Orders fetched successfully!",
      orders: products,
    });
  } catch (error) {
    console.log("###error", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const orders = await req.user.getOrders({ include: ['products']});
    return res.status(200).json({
      message: "Orders fetched successfully!",
      orders: orders,
    });
  } catch (error) {
    console.log("###error", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
