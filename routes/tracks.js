const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/session');
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const { getItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/tracks');

router.get('/', authMiddleware, getItems);
router.get('/:id', authMiddleware, validatorGetItem, getItem);
router.post('/', authMiddleware, validatorCreateItem, createItem);
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);


module.exports = router;