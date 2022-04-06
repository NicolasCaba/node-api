const express = require('express');
const uploadMiddleware = require('../utils/handleStorage');
const { createItem, getItem, getItems, deleteItem } = require('../controllers/storage');
const { validatorGetItem } = require('../validators/storage');
const router = express.Router();

// Get storage
router.get('/', getItems);

// Get storage/:id
router.get('/:id', validatorGetItem, getItem);

// Create new file
router.post('/', uploadMiddleware.single('myfile'), createItem);

// Delete file
router.delete('/:id', validatorGetItem, deleteItem);

module.exports = router;