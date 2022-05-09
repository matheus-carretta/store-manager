const router = require('express').Router();
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

router.get('/', rescue(productsController.getAll));

router.get('/:id', rescue(productsController.getProduct));

router.post('/', rescue(productsController.create));

module.exports = router;
