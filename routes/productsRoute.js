const router = require('express').Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getAll);

router.get('/:id');

module.exports = router;
