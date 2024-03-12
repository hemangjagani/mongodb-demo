const { Product } = require("../models");

exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.fetchAll();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.postProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("###error", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).send("Product not found!");
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.log("###error", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.patchProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = new Product({ ...req.body, id: productId });
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.deleteById(productId);
    if (deletedProduct.deletedCount > 0) {
      res.status(200).json({ message: "Product deleted successfully!" });
    } else {
      res.status(404).json({ message: "No product found!" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
};
