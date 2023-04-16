const express = require('express');
const router = express.Router();
const checkOrigin = require('../middlewares/origin');
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../middlewares/roleAuth');
const { getItems, getItem, createItem, deleteItem, updateItem } = require('../controllers/users');
const { validateCreate } = require('../validators/users');

router.get('/', checkAuth, getItems);

router.get('/:id', checkOrigin, getItem);

//TODO: Donde recibimos data;
router.post('/', checkOrigin, validateCreate, createItem);

router.patch('/:id', updateItem);

router.delete('/:id', deleteItem);


module.exports = router;