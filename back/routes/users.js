const express = require('express');
const users = require('../controllers/users');
const router = express.Router();

router.get('/', users.getUser);

router.post('/', users.registerUser);

module.exports = router;
