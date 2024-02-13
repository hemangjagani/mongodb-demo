/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API for managing cart products
 * /api/cart:
 *   get:
 *     summary: Get cart products
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: A list of products in the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cartResponse'
 * /api/cart/add-product:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartProductRequest'
 *     responses:
 *       '200':
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cartResponse'
 * /api/cart/delete-product/{productId}:
 *   delete:
 *     summary: Remove a product by ID from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: cart
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/cartResponse'
 *       '404':
 *         description: Product not found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/not-found'
 */

const express = require("express");
const { addProduct, getCartDetails, deleteProduct } = require("../controllers/cart");

const router = express.Router();

router.get("/cart", getCartDetails);

router.post("/cart/add-proudct", addProduct);

router.delete("/cart/delete-proudct/:productId", deleteProduct);

module.exports = router;
