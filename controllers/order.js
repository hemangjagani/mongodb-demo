const { Order, User } = require("../models");

exports.postOrders = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user || user?.cart?.length <= 0) {
      if (user?.cart?.length <= 0) {
        res.status(400).json({
          success: false,
          message: "First please add products in cart!",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "User not found!",
        });
      }
    } else {
      const cartDetails = {
        items: user.cart,
        userId: user._id,
        username: user.username,
      };
      const order = new Order({ cart: cartDetails });
      const orderDetails = await order.createOrder();
      if (orderDetails.acknowledged) {
        res.status(200).json({ success: true, message: "Order successfully!" });
      }
    }
  } catch (error) {
    console.log("###error", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await req.user.getOrders({ include: ["products"] });
    return res.status(200).json({
      message: "Orders fetched successfully!",
      orders: orders,
    });
  } catch (error) {
    console.log("###error", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
