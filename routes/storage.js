const express = require('express');
const uploadMiddleware = require('../utils/handleStorage');
const { createItem, getItem, getItems } = require('../controllers/storage');
const router = express.Router();

router.get('/', getItems);
router.post('/', uploadMiddleware.single('myfile'), createItem);

module.exports = router;