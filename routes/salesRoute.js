const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);

router.get('/:id', salesController.getSale);

module.exports = router;