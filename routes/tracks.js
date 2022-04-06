const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/session');
const checkRole = require('../middlewares/role');
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const { getItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/tracks');

// Get tracks
router.get('/', authMiddleware, getItems);

// Get track by id
router.get('/:id', authMiddleware, validatorGetItem, getItem);

// Create new track
router.post('/',
  authMiddleware,
  checkRole(['admin']),
  validatorCreateItem,
  createItem
);

// Update track
router.put('/:id',
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);

// Delete track
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);


module.exports = router;