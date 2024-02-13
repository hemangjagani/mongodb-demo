const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    console.log("###products", products);
    res.status(200).json(products);
  });
};

exports.postProduct = async (req, res) => {
  const product = new Product(req.body);
  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
};

exports.getProduct = (req, res) => {
  const productId = req.params.id;
  Product.fetchProduct(productId, (product) => {
    console.log("###product", product);
    if (product) res.status(200).json(product);
    else res.status(400).json({ message: "No product found!" });
  });
};

exports.patchProduct = async (req, res) => {
  const productId = req.params.id;
  const product = new Product({ ...req.body, id: productId });
  const updatedProduct = await product.save();
  if (updatedProduct) res.status(200).json(updatedProduct);
  else res.status(400).json({ message: "No product found!" });
};
