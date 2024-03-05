const { Product } = require("../models");

exports.getProducts = async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;

    // Calculate the offset based on the page and pageSize
    const offset = (page - 1) * pageSize;

    // Find products with pagination
    const { count, rows } = await Product.findAndCountAll({
      limit: pageSize,
      offset: offset,
    });

    // Send the paginated product data as response
    res.status(200).json({ count, products: rows });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.postProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;
  try {
   const createdProduct = await req.user.createProduct({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    });
    // Send the created product instance as response
    res.status(201).json(createdProduct);
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      // Validation error occurred
      const errors = error.errors.map((err) => ({
        message: `${err.path} is required!`,
      }));
      res.status(400).json({ errors });
    } else {
      // Other error occurred
      console.error("Error creating product:", error);
      res.status(500).send("Internal Server Error");
    }
  }
};

exports.getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).send("Product not found!");
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.patchProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Update the product attributes
    const updatedProduct = await product.update(req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    // Find the product by its id
    const product = await Product.findByPk(productId);

    // If the product doesn't exist, return a 404 response
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Delete the product
    await product.destroy();

    // Send a success message
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
};
