const router = require('express').Router();
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const { validateName } = require('../middlewares/productsValidations');

router.get('/', rescue(productsController.getAll));

router.get('/:id', rescue(productsController.getProduct));

router.post('/', validateName, rescue(productsController.create));

module.exports = router;
