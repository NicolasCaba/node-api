const express = require('express');
const uploadMiddleware = require('../utils/handleStorage');
const { createItem, getItem, getItems, updateItem, deleteItem } = require('../controllers/storage');
const { validatorCreateItem, validatorGetItem } = require('../validators/storage');
const router = express.Router();

router.get('/', getItems);
router.get('/:id', validatorGetItem, getItem);
router.post('/', uploadMiddleware.single('myfile'), createItem);
router.put('/:id', validatorGetItem, validatorCreateItem, updateItem);
router.delete('/:id', validatorGetItem, deleteItem);

module.exports = router;