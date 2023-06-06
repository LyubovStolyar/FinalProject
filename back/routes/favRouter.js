const express = require('express');
const favorites = require('../controllers/favorites');
const router = express.Router();


router.get('/', favorites.getFav);
router.post('/', favorites.addToFav);
router.delete('/', favorites.deleteFromFav);

module.exports = router;