const express = require('express');
const items = require('../controllers/items');
const router = express.Router();

router.get('/', items.getItems);
router.post('/', items.addItem);



module.exports = router;