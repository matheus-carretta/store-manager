const Joi = require('joi');
const errorHandler = require('../utils/errorStatusCreator');

const SALES = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

const validateSale = (req, res, next) => {
  const sales = req.body;

  sales.forEach(({ productId, quantity }) => {
    const { error } = SALES.validate({ productId, quantity });

    if (error) {
      const errorObj = errorHandler(error.details[0].type, error.details[0].message);
      next(errorObj);
    }
  });

  next();
};

module.exports = {
  validateSale,
};
