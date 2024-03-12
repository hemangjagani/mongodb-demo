/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing user registration
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistrationRequest'
 *     responses:
 *       '200':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegistrationResponse'
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */

const express = require("express");
const { createUser, getUsers, getUserById } = require("../controllers/users");
const router = express.Router();

router.post("/user/register", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);


module.exports = router;
