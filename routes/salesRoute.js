const router = require('express').Router();
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const { validateSale } = require('../middlewares/salesValidations');

router.get('/', rescue(salesController.getAll));

router.get('/:id', rescue(salesController.getSale));

router.post('/', validateSale, rescue(salesController.create));

router.put('/:id', validateSale, rescue(salesController.update));

router.delete('/:id', rescue(salesController.remove));

module.exports = router;