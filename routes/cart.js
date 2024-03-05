/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API for managing cart products
 * /api/cart:
 *   get:
 *     summary: Get cart products
 *     tags: [Cart]
 *     parameters: 
 *        - in: query
 *          name: userId
 *          schema:
 *            type: integer
 *          description: user id
 *          required: true
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
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of the User
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
 * /api/create-order:
 *   post:
 *     summary: Order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/orderReqeust'
 *     responses:
 *       '200':
 *         description: order successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/orderResponse'
 * 
 * /api/orders:
 *   get:
 *     summary: Get Order products
 *     tags: [Order]
 *     parameters: 
 *        - in: query
 *          name: userId
 *          schema:
 *            type: integer
 *          description: user id
 *          required: true
 *     responses:
 *       '200':
 *         description: A list of products in the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ordersResponse'
 */

const express = require("express");
const { addProduct, getCartDetails, deleteProduct } = require("../controllers/cart");
const { postOrders, getOrders } = require("../controllers/order");

const router = express.Router();

router.get("/cart", getCartDetails);

router.post("/cart/add-product", addProduct);

router.delete("/cart/delete-product/:productId", deleteProduct);

router.post("/create-order", postOrders);
router.get("/orders", getOrders);

module.exports = router;
