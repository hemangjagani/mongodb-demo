const { Product } = require("../models");
const Cart = require("../models/cart");

exports.getCartDetails = async (req, res, next) => {
  try {
    const cartDetails = await req.user.getCart();
    const productDetails = await cartDetails.getProducts();
    return res.status(200).json({
      message: "Cart details fetched successfully!",
      cart: productDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const prodId = req.body.productId;

    // Get the cart details for the current user
    const cartDetails = await req.user.getCart();

    // Get products in the cart matching the provided productId
    const products = await cartDetails.getProducts({
      where: { id: prodId },
    });

    // Initialize quantity to 1
    let newQuantity = 1;

    // If the product is already in the cart, update the quantity
    if (products?.length > 0) {
      const product = products[0];
      newQuantity += product["cartItem"].quantity;
    }

    // Find the product details by its id
    const productDetails = await Product.findByPk(prodId);

    // If the product exists, add it to the cart with the calculated quantity
    if (productDetails) {
      await cartDetails.addProduct(productDetails, {
        through: { quantity: newQuantity },
      });

      // Fetch updated cart details with only cartItem data
      const updatedCart = await req.user.getCart({
        include: [
          {
            model: Product,
            as: "products",
            through: { attributes: ["quantity"] }, // Only include quantity attribute from the join table (cartItem)
          },
        ],
      });

      // Extract product details from the updated cart
      const updatedProductDetails = updatedCart.products;

      // Return only cartItem data in the response
      return res.status(200).json({
        message: "Product added to cart successfully!",
        cart: updatedProductDetails,
      });
    } else {
      res.status(404).json({ success: false, message: "Product not found!" });
    }
  } catch (error) {
    console.log("###error", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const prodId = req.params.productId;
    console.log("###prodId", prodId);
    // Get the cart details for the current user
    const cartDetails = await req.user.getCart();

    // Get products in the cart matching the provided productId
    const products = await cartDetails.getProducts({
      where: { id: prodId },
    });

    const product = products[0];
    if (product) {
      const deletedProduct = await product.cartItem.destroy();

      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Product not exist!" });
    }
  } catch (error) {
    console.log("###error", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
