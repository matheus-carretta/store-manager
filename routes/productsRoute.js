const router = require('express').Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getProduct);

module.exports = router;
