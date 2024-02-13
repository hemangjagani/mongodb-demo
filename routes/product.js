/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products by admin
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/products'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single product
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/product'
 *       '404':
 *         description: Product not found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/not-found'
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       '200':
 *         description: A single product
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/product'
 *       '404':
 *         description: Product not found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/not-found'
 */

const express = require("express");

const router = express.Router();

const {
  getProducts,
  postProduct,
  getProduct,
  patchProduct,
} = require("../controllers/products");

router.get("/products", getProducts);

router.post("/products", postProduct);

router.patch("/products/:id", patchProduct);

router.get("/products/:id", getProduct);

module.exports = router;
