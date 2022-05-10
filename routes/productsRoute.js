const router = require('express').Router();
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const { validateProduct } = require('../middlewares/productsValidations');

router.get('/', rescue(productsController.getAll));

router.get('/:id', rescue(productsController.getProduct));

router.post('/', validateProduct, rescue(productsController.create));

router.put('/:id', rescue(productsController.update));

router.delete('/:id', rescue(productsController.remove));

module.exports = router;
