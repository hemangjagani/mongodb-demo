const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const productFilePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductFromFile = (cb) => {
  fs.readFile(productFilePath, (err, data) => {
    if (err) {
      cb([]);
    } else {
      const products = JSON.parse(data);
      cb(products);
    }
  });
};

module.exports = class Product {
  constructor({
    id,
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
  }) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.discountPercentage = discountPercentage),
      (this.rating = rating),
      (this.stock = stock),
      (this.brand = brand),
      (this.category = category),
      (this.thumbnail = thumbnail),
      (this.images = images);
  }

  save() {
    return new Promise((resolve, reject) => {
      getProductFromFile((products) => {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const existingProduct = products[existingProductIndex];

        const updatedProduct = {
          id: this.id,
          title: this.title || existingProduct?.title || "",
          description: this.description || existingProduct?.description || "",
          price: this.price || existingProduct?.price || 0,
          discountPercentage:
            this.discountPercentage || existingProduct?.discountPercentage || 0,
          rating: this.rating || existingProduct?.rating || 0,
          stock: this.stock || existingProduct?.stock || 0,
          brand: this.brand || existingProduct?.brand || "",
          category: this.category || existingProduct?.category || "",
          thumbnail: this.thumbnail || existingProduct?.thumbnail || "",
          images: this.images || existingProduct?.images || [],
        };

        if (existingProductIndex !== -1) {
          products[existingProductIndex] = updatedProduct;
        } else {
          this.id = uuidv4();
          products.push(updatedProduct);
        }

        fs.writeFile(productFilePath, JSON.stringify(products), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(updatedProduct);
          }
        });
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile((products) => {
      cb(products);
    });
  }
  static fetchProduct(productId, cb) {
    getProductFromFile((products) => {
      const selectedProduct = products.find(
        (product) => product.id === productId
      );
      if (selectedProduct) {
        cb(selectedProduct);
      } else {
        cb(null);
      }
    });
  }
};
