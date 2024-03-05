const express = require('express');
const { createUser } = require("../controllers/users");
const router = express.Router();


router.post('/user/register', createUser);

module.exports = router;